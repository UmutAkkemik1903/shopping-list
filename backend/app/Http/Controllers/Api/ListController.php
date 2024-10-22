<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ListModel;
use App\Models\ListProductModel;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\FunctionController;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      //   
    }

    public function archivedList()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $products = ListModel::leftJoin('list_product', function($join) {
                    $join->on('list_product.list_id', '=', 'shopping_list.id');
                })
                ->leftJoin('products', function($join) {
                    $join->on('list_product.product_id', '=', 'products.id');
                })
                ->whereNotNull('shopping_list.deleted_at')
                ->where('shopping_list.created_by', $user->id)
                ->get([
                    'shopping_list.id as list_id',
                    'shopping_list.name as list_name',
                    'shopping_list.created_at as list_created_at',
                    'products.id as product_id',
                    'products.name as product_name',
                    'list_product.created_at as product_created_at',
                    'list_product.quantity as quantity'
                ]);
        
            $groupedProducts = $products->groupBy('list_id')->map(function($items) {
                return [
                    'list_id' => $items->first()->list_id,
                    'list_name' => $items->first()->list_name,
                    'created_at' => $items->first()->list_created_at,
                    'products' => $items->map(function($item) {
                        return [
                            'product_id' => $item->product_id,
                            'product_name' => $item->product_name,
                            'product_created_at' => $item->product_created_at,
                            'quantity' => $item->quantity,
                        ];
                    }),
                ];
            })->values();
        
            return response()->json($groupedProducts);
        } else {
            return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
        } 
  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
    if ($user) {
        $functionController = new FunctionController();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()]);
        }

        ListModel::create([
            'name' => $request->input('name'),
            'created_by' => $user->id,
            'created_at' => $functionController->nowDate,
        ]);

        return response()->json(['success' => true, 'message' => 'Kayıt başarılı.']);
    } else {
        return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (Auth::check()) {
            $user = Auth::user();
            
            $products = ListModel::where('created_by', $user->id)
                ->where(['id'=>$id])
                ->get([
                    'id as list_id',
                    'name as list_name',
                    'created_at as list_created_at',
                ]);
        
            return response()->json($products);
        } else {
            return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        if ($user) {
            $functionController = new FunctionController();
    
            $validator = Validator::make($request->all(), [
                'list_name' => 'required|string|max:255',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()->first()]);
            }
    
            ListModel::where(['id'=>$id])->update([
                'name' => $request->input('list_name'),
                'updated_at' => $functionController->nowDate,
            ]);
    
            return response()->json(['success' => true, 'message' => 'Güncelleme başarılı.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function archive(string $id)
    {
        $user = Auth::user();
        if ($user) {
            $functionController = new FunctionController();
    
            ListModel::where(['id'=>$id])->update([
                'deleted_at' => $functionController->nowDate,
            ]);
    
            return response()->json(['success' => true, 'message' => 'Arşivlendi.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
        }
    }
    public function destroy(string $id)
    {
        $user = Auth::user();
        if ($user) {
            ListModel::where(['id'=>$id])->delete();
            ListProductModel::where(['list_id'=>$id])->delete();
            return response()->json(['success' => true, 'message' => 'Silme işlemi başarılı.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Kullanıcı girişi yapmalısınız.']);
        }
    }
}
