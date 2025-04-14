import babka from "src/assets/images/babka.jpg"
import friedcalamarisalad from "src/assets/images/friedcalamarisalad.webp"
import undBread from "src/assets/images/und-bread-02.webp"

export const RECIPE_TYPES = ["All products", "Tomato", "Egg", "Potato", "Pasta", "Bread"]

export const RECIPE_LIST = 
  [
    {
    id:1,
    src: babka,
    title: "Brownie Babka",
    difficulty: "Medium",
    preparation: "30 mins",
    cookTime: "45 mins",
    servings: 10,
    tags: ["bread"],
    ingredients :
    [{title:"IngredientsVanilla challah dough",
      list:[
        "½ cup warm milk","1 heaped teaspoon instant yeast",
"1 teaspoon sugar ", "1 large egg at room temperature -", "⅛ cup honey", "¼ cup canola oil", "2 teaspoons pure vanilla extract","2 cups bread flour 250g plus more if needed -"
      ]
    },
    {
      title:"Brownie batter",
      list:[
        "3 oz unsalted butter about 6 TB -", "1 ½ oz dark chocolate chopped, about 1/4 cup -", "4 oz sugar 1/2 cup plus 1 tablespoon -", "½ oz brown sugar 1 tablespoon -", "½ teaspoon salt", "2 eggs divided into 1 egg plus 1 yolk save the second white for the bread’s egg wash -", "¼ cup all purpose flour", "1 oz dutch process cocoa 1/4 cup plus 1 tablespoon -", "1 teaspoon vanilla"
      ]
    }],
  directions:[
    {
      steps: [
        {text: "Bring a pot of water to a boil over high heat. Reduce heat to low, place hot dog in water, and cook until warmed through, about five minutes. Remove hot dog from water and set aside.", finish:false},
        {text: "Place a steamer basket into the pot and steam poppy seed bun until warm, about two minutes.",finish:false},
        {text: "Place the hot dog in a steamed bun.", finish:false},
        {text: "Pile on toppings in this order: mustard, relish, onion, tomato, pickle, peppers, and celery salt. The tomato wedges should be nestled between the hot dog and the top of the bun on one side.Place the hot dog in a steamed bun.", finish:false,
        },
        {text: "Place a pickle between the hot dog and the bottom of the bun on the other side. Don't even think about ketchup!", finish:false}
      ]
    }
  ]
  },{
      id:2,
      src: friedcalamarisalad,
      title: "Boldly Fried Calamari* Ring Salad 2",
      difficulty: "Medium",
      preparation: "8 hours",
      cookTime: "35 mins",
      servings: 4,
      tags: ["salad"],
      ingredients :
      [{
        list:[
          "1 lb Boldly Calamari* Rings", "1 cup all-purpose flour", "½ cup cornstarch", "1 tbsp baking powder", "Salt and pepper, to taste", "1 tbsp smoked paprika", "⅓ cup fresh dill, chopped", "Vegetable oil, for frying", "Spring mix lettuce blend", "¼ cup olive oil", "Half a lemon, juiced", "1 tsp white balsamic", "Lemon wedges, for serving", "Chopped chives, for garnish"
        ]
      }],
    directions:[
      {
        steps: [
          {text: "Thaw Boldly Calamari* Rings in the fridge overnight (approx. 8 hours).", finish:false},
          {text: "Fill a medium-sized pot with water and boil the thawed Calamari* Rings for 3-4 minutes. Drain & set aside.",finish:false},
          {text: "In a pan, heat oil over medium-high heat.", finish:false},
          {text: "Combine flour, cornstarch, baking powder, paprika, dill, salt and pepper in a large bowl.", finish:false,
          },
          {text: "Toss the Calamari* Rings into the mixture to fully coat.", finish:false},
          {text: "Once the oil is shimmering and hot, add the Calamari* Rings and fry until golden, about 2-3 minutes. Remove and salt immediately.", finish:false},
          {text: "For the salad, place a handful or two of the spring mix lettuce into a serving bowl.", finish:false},
          {text: "In a mason jar or small bowl combine olive oil, lemon juice, and white balsamic. Stir until combined.", finish:false},
          {text: "Add the fried Calamari* Rings to the salad and pour the dressing over top.", finish:false},
          {text: "Serve the Boldly Fried Calamari* Ring Salad immediately, garnished with fresh chopped chives and a lemon wedge for squeezing. Enjoy!", finish:false},
        ]
      }
    ]
  },
  {
    id:3,
    src: undBread,
    title: "Egg Sandwich",
    difficulty: "Easy",
    preparation: "14 mins",
    cookTime: "10 mins",
    servings: 2,
    tags: ["bread"],
    ingredients :
    [{title:"IngredientsVanilla challah dough",
      list:[
        "1 loaf of almond milk bread cut into 6 slices",
"3 eggs", "A pinch each of salt and pepper", "2 tablespoon mayonnaise", "1 teaspoon mustard"
      ]
    },
    ],
  directions:[
    {
      steps: [
        {text: "Lightly crack the eggs and boil for 12 minutes and 20 seconds from water temperature to make boiled eggs. Cut almond milk bread into 6 slices.", finish:false},
        {text: "Peel the shell while soaking the boiled egg in water and separate the yolk from the white. Season the whites of the eggs with salt and pepper.",finish:false},
        {text: "Chop the yolks and whites and mix them in one dish.", finish:false},
        {text: "Dress with mayonnaise and mustard and mix roughly.", finish:false,
        },
        {text: "Place two slices of almond milk bread on a sheet of cooking paper and spread mayonnaise on both.", finish:false},
        {text: "Place egg salad on almond milk bread with mayonnaise and spread egg salad gently toward all four corners.", finish:false},
        {text: "Place another slice of bread on top, fold the cooking paper over the top and bottom, and wrap the egg sandwich.", finish:false},
        {text: "Cut the wrapped egg sandwich from the middle. A hearty egg sandwich is ready!", finish:false}
      ]
    }
  ]
  },{
      id:4,
      src: friedcalamarisalad,
      title: "Boldly Fried Calamari* Ring Salad 4",
      difficulty: "Medium",
      preparation: "8 hours",
      cookTime: "35 mins",
      servings: 4,
      tags: ["salad"],
      ingredients :
      [{
        list:[
          "1 lb Boldly Calamari* Rings", "1 cup all-purpose flour", "½ cup cornstarch", "1 tbsp baking powder", "Salt and pepper, to taste", "1 tbsp smoked paprika", "⅓ cup fresh dill, chopped", "Vegetable oil, for frying", "Spring mix lettuce blend", "¼ cup olive oil", "Half a lemon, juiced", "1 tsp white balsamic", "Lemon wedges, for serving", "Chopped chives, for garnish"
        ]
      }],
    directions:[
      {
        steps: [
          {text: "Thaw Boldly Calamari* Rings in the fridge overnight (approx. 8 hours).", finish:false},
          {text: "Fill a medium-sized pot with water and boil the thawed Calamari* Rings for 3-4 minutes. Drain & set aside.",finish:false},
          {text: "In a pan, heat oil over medium-high heat.", finish:false},
          {text: "Combine flour, cornstarch, baking powder, paprika, dill, salt and pepper in a large bowl.", finish:false,
          },
          {text: "Toss the Calamari* Rings into the mixture to fully coat.", finish:false},
          {text: "Once the oil is shimmering and hot, add the Calamari* Rings and fry until golden, about 2-3 minutes. Remove and salt immediately.", finish:false},
          {text: "For the salad, place a handful or two of the spring mix lettuce into a serving bowl.", finish:false},
          {text: "In a mason jar or small bowl combine olive oil, lemon juice, and white balsamic. Stir until combined.", finish:false},
          {text: "Add the fried Calamari* Rings to the salad and pour the dressing over top.", finish:false},
          {text: "Serve the Boldly Fried Calamari* Ring Salad immediately, garnished with fresh chopped chives and a lemon wedge for squeezing. Enjoy!", finish:false},
        ]
      }
    ]
  },
  {
    id:5,
    src: babka,
    title: "Brownie Babka 5",
    difficulty: "Medium",
    preparation: "30 mins",
    cookTime: "45 mins",
    servings: 10,
    tags: ["bread"],
    ingredients :
    [{title:"IngredientsVanilla challah dough",
      list:[
        "½ cup warm milk","1 heaped teaspoon instant yeast",
"1 teaspoon sugar ", "1 large egg at room temperature -", "⅛ cup honey", "¼ cup canola oil", "2 teaspoons pure vanilla extract","2 cups bread flour 250g plus more if needed -"
      ]
    },
    {
      title:"Brownie batter",
      list:[
        "3 oz unsalted butter about 6 TB -", "1 ½ oz dark chocolate chopped, about 1/4 cup -", "4 oz sugar 1/2 cup plus 1 tablespoon -", "½ oz brown sugar 1 tablespoon -", "½ teaspoon salt", "2 eggs divided into 1 egg plus 1 yolk save the second white for the bread’s egg wash -", "¼ cup all purpose flour", "1 oz dutch process cocoa 1/4 cup plus 1 tablespoon -", "1 teaspoon vanilla"
      ]
    }],
  directions:[
    {
      steps: [
        {text: "Bring a pot of water to a boil over high heat. Reduce heat to low, place hot dog in water, and cook until warmed through, about five minutes. Remove hot dog from water and set aside.", finish:false},
        {text: "Place a steamer basket into the pot and steam poppy seed bun until warm, about two minutes.",finish:false},
        {text: "Place the hot dog in a steamed bun.", finish:false},
        {text: "Pile on toppings in this order: mustard, relish, onion, tomato, pickle, peppers, and celery salt. The tomato wedges should be nestled between the hot dog and the top of the bun on one side.Place the hot dog in a steamed bun.", finish:false,
        },
        {text: "Place a pickle between the hot dog and the bottom of the bun on the other side. Don't even think about ketchup!", finish:false}
      ]
    }
  ]
  },{
      id:6,
      src: friedcalamarisalad,
      title: "Boldly Fried Calamari* Ring Salad 6",
      difficulty: "Medium",
      preparation: "8 hours",
      cookTime: "35 mins",
      servings: 4,
      tags: ["salad"],
      ingredients :
      [{
        list:[
          "1 lb Boldly Calamari* Rings", "1 cup all-purpose flour", "½ cup cornstarch", "1 tbsp baking powder", "Salt and pepper, to taste", "1 tbsp smoked paprika", "⅓ cup fresh dill, chopped", "Vegetable oil, for frying", "Spring mix lettuce blend", "¼ cup olive oil", "Half a lemon, juiced", "1 tsp white balsamic", "Lemon wedges, for serving", "Chopped chives, for garnish"
        ]
      }],
    directions:[
      {
        steps: [
          {text: "Thaw Boldly Calamari* Rings in the fridge overnight (approx. 8 hours).", finish:false},
          {text: "Fill a medium-sized pot with water and boil the thawed Calamari* Rings for 3-4 minutes. Drain & set aside.",finish:false},
          {text: "In a pan, heat oil over medium-high heat.", finish:false},
          {text: "Combine flour, cornstarch, baking powder, paprika, dill, salt and pepper in a large bowl.", finish:false,
          },
          {text: "Toss the Calamari* Rings into the mixture to fully coat.", finish:false},
          {text: "Once the oil is shimmering and hot, add the Calamari* Rings and fry until golden, about 2-3 minutes. Remove and salt immediately.", finish:false},
          {text: "For the salad, place a handful or two of the spring mix lettuce into a serving bowl.", finish:false},
          {text: "In a mason jar or small bowl combine olive oil, lemon juice, and white balsamic. Stir until combined.", finish:false},
          {text: "Add the fried Calamari* Rings to the salad and pour the dressing over top.", finish:false},
          {text: "Serve the Boldly Fried Calamari* Ring Salad immediately, garnished with fresh chopped chives and a lemon wedge for squeezing. Enjoy!", finish:false},
        ]
      }
    ]
  },
  {
    id:7,
    src: babka,
    title: "Brownie Babka 7",
    difficulty: "Medium",
    preparation: "30 mins",
    cookTime: "45 mins",
    servings: 10,
    tags: ["bread"],
    ingredients :
    [{title:"IngredientsVanilla challah dough",
      list:[
        "½ cup warm milk","1 heaped teaspoon instant yeast",
"1 teaspoon sugar ", "1 large egg at room temperature -", "⅛ cup honey", "¼ cup canola oil", "2 teaspoons pure vanilla extract","2 cups bread flour 250g plus more if needed -"
      ]
    },
    {
      title:"Brownie batter",
      list:[
        "3 oz unsalted butter about 6 TB -", "1 ½ oz dark chocolate chopped, about 1/4 cup -", "4 oz sugar 1/2 cup plus 1 tablespoon -", "½ oz brown sugar 1 tablespoon -", "½ teaspoon salt", "2 eggs divided into 1 egg plus 1 yolk save the second white for the bread’s egg wash -", "¼ cup all purpose flour", "1 oz dutch process cocoa 1/4 cup plus 1 tablespoon -", "1 teaspoon vanilla"
      ]
    }],
  directions:[
    {
      steps: [
        {text: "Bring a pot of water to a boil over high heat. Reduce heat to low, place hot dog in water, and cook until warmed through, about five minutes. Remove hot dog from water and set aside.", finish:false},
        {text: "Place a steamer basket into the pot and steam poppy seed bun until warm, about two minutes.",finish:false},
        {text: "Place the hot dog in a steamed bun.", finish:false},
        {text: "Pile on toppings in this order: mustard, relish, onion, tomato, pickle, peppers, and celery salt. The tomato wedges should be nestled between the hot dog and the top of the bun on one side.Place the hot dog in a steamed bun.", finish:false,
        },
        {text: "Place a pickle between the hot dog and the bottom of the bun on the other side. Don't even think about ketchup!", finish:false}
      ]
    }
  ]
  },{
      id:8,
      src: friedcalamarisalad,
      title: "Boldly Fried Calamari* Ring Salad 8",
      difficulty: "Medium",
      preparation: "8 hours",
      cookTime: "35 mins",
      servings: 4,
      tags: ["salad"],
      ingredients :
      [{
        list:[
          "1 lb Boldly Calamari* Rings", "1 cup all-purpose flour", "½ cup cornstarch", "1 tbsp baking powder", "Salt and pepper, to taste", "1 tbsp smoked paprika", "⅓ cup fresh dill, chopped", "Vegetable oil, for frying", "Spring mix lettuce blend", "¼ cup olive oil", "Half a lemon, juiced", "1 tsp white balsamic", "Lemon wedges, for serving", "Chopped chives, for garnish"
        ]
      }],
    directions:[
      {
        steps: [
          {text: "Thaw Boldly Calamari* Rings in the fridge overnight (approx. 8 hours).", finish:false},
          {text: "Fill a medium-sized pot with water and boil the thawed Calamari* Rings for 3-4 minutes. Drain & set aside.",finish:false},
          {text: "In a pan, heat oil over medium-high heat.", finish:false},
          {text: "Combine flour, cornstarch, baking powder, paprika, dill, salt and pepper in a large bowl.", finish:false,
          },
          {text: "Toss the Calamari* Rings into the mixture to fully coat.", finish:false},
          {text: "Once the oil is shimmering and hot, add the Calamari* Rings and fry until golden, about 2-3 minutes. Remove and salt immediately.", finish:false},
          {text: "For the salad, place a handful or two of the spring mix lettuce into a serving bowl.", finish:false},
          {text: "In a mason jar or small bowl combine olive oil, lemon juice, and white balsamic. Stir until combined.", finish:false},
          {text: "Add the fried Calamari* Rings to the salad and pour the dressing over top.", finish:false},
          {text: "Serve the Boldly Fried Calamari* Ring Salad immediately, garnished with fresh chopped chives and a lemon wedge for squeezing. Enjoy!", finish:false},
        ]
      }
    ]
  }
]