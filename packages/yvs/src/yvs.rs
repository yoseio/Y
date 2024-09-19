use kiddo::{ImmutableKdTree, SquaredEuclidean};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

type Tree = ImmutableKdTree<f32, 384>;

#[derive(Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Content {
    pub id: String,
    pub vector: Vec<f32>,
}

#[derive(Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct YvsOptions {
    pub contents: Vec<Content>,
}

#[wasm_bindgen]
pub struct Yvs {
    tree: Tree,
    data: HashMap<u64, String>,
}

#[wasm_bindgen]
impl Yvs {
    #[wasm_bindgen(constructor)]
    pub fn new(opts: YvsOptions) -> Self {
        let source = opts
            .contents
            .iter()
            .map(|c| c.vector.clone().try_into().unwrap())
            .collect::<Vec<[f32; 384]>>();
        let tree = ImmutableKdTree::new_from_slice(&source);
        let data = opts
            .contents
            .iter()
            .enumerate()
            .map(|(i, c)| (i as u64, c.id.clone()))
            .collect();
        Self { tree, data }
    }

    pub fn search(&self, query: Vec<f32>, k: usize) -> Vec<String> {
        let query: &[f32; 384] = &query.try_into().unwrap();
        self.tree
            .nearest_n::<SquaredEuclidean>(query, k)
            .iter()
            .map(|neighbour| self.data.get(&neighbour.item).unwrap().clone())
            .collect()
    }
}
