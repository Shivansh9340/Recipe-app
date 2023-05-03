import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from '../recipes/recipe.model';

import { exhaustMap, map,take,tap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://recipe-424c6-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }
    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(
            user=>{
                return this.http.get<Recipe[]>('https://recipe-424c6-default-rtdb.firebaseio.com/recipes.json',
                {
                    params: new HttpParams().set('auth', user.token)
                });
            }),
            map((res) => {
                const recipes = [];
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        recipes.push({ ...res[key], id: key });
                    }
                }
                console.log(recipes);
                return recipes; 
            }),
        );
    }
}