<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product?page={page}&title={title}",
     *     @OA\Response(response="200", description="List Products."),
     *     @OA\Parameter(
     *          name="page",
     *          in="query",
     *          description="Current page",
     *          required=true,
     *          @OA\Schema(
     *              type="string",
     *          default="1",
     *          )
     *      ),
     *          @OA\Parameter(
     *           name="title",
     *           in="query",
     *           description="Filter by title",
     *           required=false,
     *           @OA\Schema(
     *               type="string",
     *           default="",
     *           )
     *       ),
     * )
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('title')) {
            $title = $request->input('title');
            $query->where('title', 'like', '%' . $title . '%');
        }

        $list = $query->paginate(2);
        return response()->json($list,200);
    }

    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="title",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="400", description="Validation has been fault"),
     * )
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $messages = array(
            'title.required' => 'Вкажіть title of product!',
            'price.required' => 'Вкажіть price of product!',
            'description.required' => 'Вкажіть description of product!',
        );
        $validator = Validator::make($input, [
            'title' => 'required',
            'price' => 'required',
            'description' => 'required',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $product = Product::create($input);
        return response()->json($product);
    }

    /**
     * @OA\Delete(
     *     tags={"Product"},
     *     path="/api/product/{id}",
     *     @OA\Parameter(
     *          name="id",
     *          description="product id to delete",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="404", description="id not found"),
     * )
     */
    public function destroy(string $id)
    {
        $deleted = Product::destroy($id);
        if($deleted < 1)
            return response()->json($id,404);
        return response()->json($deleted);
    }



    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product/{id}",
     *     @OA\Parameter(
     *          name="id",
     *          description="product id to edit",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *
     *                 @OA\Property(
     *                     property="title",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     * ,
     *                  @OA\Property(
     *                      property="price",
     *                      type="integer"
     *                  )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="400", description="Validation has fault"),
     * )
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();

        $product = Product::find($id);

        if (isset($input['title'])) {
            $product->title = $input['title'];
        }

        if (isset($input['description'])) {
            $product->description = $input['description'];
        }

        if (isset($input['price'])) {
            $product->price = $input['price'];
        }

        $product->save();

        return response()->json($product);
    }

    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product/{id}",
     *     @OA\Parameter(
     *          name="id",
     *          description="product id to get",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\Response(response="200", description="One category found."),
     *     @OA\Response(response="404", description="Category not found"),
     *     @OA\Response(response="400", description="Request validation fault"),
     * )
     */
    public function edit(string $id)
    {
        $product = DB::table('products')->find($id);
        if($product == null)
            return response()->json("Not found", 404);

        return response()->json($product);
    }
}
