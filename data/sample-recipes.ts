import { Recipe } from "@/types/recipe";

export const sampleRecipes: Omit<Recipe, "id" | "createdAt">[] = [
  {
    title: "Ayam Goreng Berempah Pedas",
    description:
      "Ayam goreng yang berempah dan pedas, sempurna untuk hidangan keluarga. Resepi mudah dengan bahan-bahan yang mudah didapati.",
    category: "Daging",
    prepTime: 15,
    cookTime: 30,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Ayam", amount: "1 ekor (potong 8 bahagian)", group: "Untuk hidangan utama" },
      { id: "2", name: "Bawang merah", amount: "5 ulas" },
      { id: "3", name: "Bawang putih", amount: "3 ulas" },
      { id: "4", name: "Halia", amount: "1 inci" },
      { id: "5", name: "Kunyit hidup", amount: "1 inci" },
      { id: "6", name: "Cili kering", amount: "5 biji" },
      { id: "7", name: "Serai", amount: "2 batang" },
      { id: "8", name: "Garam", amount: "1 sudu teh" },
      { id: "9", name: "Gula", amount: "1 sudu teh" },
      { id: "10", name: "Minyak masak", amount: "Untuk menggoreng" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Kisar semua bahan rempah (bawang merah, bawang putih, halia, kunyit, cili kering, serai) hingga halus.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Perap ayam dengan rempah kisar, garam dan gula. Biarkan sekurang-kurangnya 30 minit atau semalaman untuk rasa yang lebih sedap.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Panaskan minyak dalam kuali. Goreng ayam dengan api sederhana hingga masak dan keemasan. Angkat dan toskan minyak.",
      },
    ],
    nutrition: {
      calories: 320,
      totalFat: 18.5,
      protein: 28.3,
      carbohydrate: 8.2,
      cholesterol: 85.4,
    },
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd7cd2208e7?w=800&q=80",
    author: "JomMasakResepi",
  },
  {
    title: "Nasi Goreng Ayam",
    description:
      "Nasi goreng klasik Malaysia dengan ayam yang mudah disediakan. Hidangan yang sempurna untuk sarapan atau makan tengah hari.",
    category: "Makan Tengah Hari",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Nasi putih", amount: "2 cawan (sejuk)" },
      { id: "2", name: "Ayam", amount: "200g (dipotong dadu)" },
      { id: "3", name: "Bawang merah", amount: "3 ulas (dihiris)" },
      { id: "4", name: "Bawang putih", amount: "2 ulas (dihiris)" },
      { id: "5", name: "Cili merah", amount: "2 biji (dihiris)" },
      { id: "6", name: "Telur", amount: "2 biji" },
      { id: "7", name: "Kicap", amount: "2 sudu besar" },
      { id: "8", name: "Garam", amount: "Secukup rasa" },
      { id: "9", name: "Minyak masak", amount: "2 sudu besar" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Panaskan minyak dalam kuali. Tumis bawang merah dan bawang putih hingga wangi. Masukkan cili merah.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Masukkan ayam dan tumis hingga masak. Masukkan telur dan kacau hingga telur masak.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Masukkan nasi putih, kicap dan garam. Kacau hingga sebati dan nasi panas. Hidangkan panas.",
      },
    ],
    nutrition: {
      calories: 285,
      totalFat: 12.3,
      protein: 18.7,
      carbohydrate: 25.4,
      cholesterol: 125.2,
    },
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Pancake Oatmeal Strawberry dengan Sirap Madu",
    description:
      "Pancake sihat dengan oatmeal dan strawberi segar, disajikan dengan sirap madu. Sempurna untuk sarapan yang mengenyangkan.",
    category: "Sarapan",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Oatmeal", amount: "1 cawan" },
      { id: "2", name: "Tepung gandum", amount: "1/2 cawan" },
      { id: "3", name: "Telur", amount: "2 biji" },
      { id: "4", name: "Susu", amount: "1 cawan" },
      { id: "5", name: "Strawberi", amount: "10 biji (dipotong)" },
      { id: "6", name: "Madu", amount: "3 sudu besar" },
      { id: "7", name: "Serbuk penaik", amount: "1 sudu teh" },
      { id: "8", name: "Garam", amount: "Secubit" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Campurkan oatmeal, tepung, serbuk penaik dan garam dalam mangkuk. Dalam mangkuk lain, pukul telur dan susu.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Gabungkan campuran kering dan basah. Masukkan strawberi yang dipotong. Kacau hingga sebati.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Panaskan kuali dengan sedikit minyak. Tuang adunan dan masak hingga keemasan di kedua-dua belah. Hidangkan dengan madu.",
      },
    ],
    nutrition: {
      calories: 245,
      totalFat: 8.2,
      protein: 12.5,
      carbohydrate: 32.8,
      cholesterol: 95.3,
    },
    imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Salad Mayonis Campuran Segar",
    description:
      "Salad yang segar dan sihat dengan mayonis buatan sendiri. Penuh dengan sayur-sayuran segar dan berkhasiat.",
    category: "Vegan",
    prepTime: 15,
    cookTime: 0,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Selada", amount: "1 kepala (dipotong)" },
      { id: "2", name: "Tomato ceri", amount: "10 biji" },
      { id: "3", name: "Timun", amount: "1 biji (dipotong)" },
      { id: "4", name: "Lobak merah", amount: "1 biji (dipotong)" },
      { id: "5", name: "Mayonis", amount: "3 sudu besar" },
      { id: "6", name: "Lemon", amount: "1 biji (jus)" },
      { id: "7", name: "Garam", amount: "Secukup rasa" },
      { id: "8", name: "Lada hitam", amount: "Secukup rasa" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Basuh dan potong semua sayur-sayuran. Letakkan dalam mangkuk besar.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Campurkan mayonis, jus lemon, garam dan lada hitam dalam mangkuk kecil untuk sos.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Tuang sos ke atas sayur-sayuran dan gaul hingga sebati. Hidangkan segera.",
      },
    ],
    nutrition: {
      calories: 125,
      totalFat: 8.5,
      protein: 3.2,
      carbohydrate: 12.3,
      cholesterol: 5.2,
    },
    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Bebola Ayam dengan Keju Krim",
    description:
      "Bebola ayam yang lembut dan berperisa, disajikan dengan sos keju krim yang sedap. Hidangan yang disukai oleh semua peringkat umur.",
    category: "Daging",
    prepTime: 20,
    cookTime: 25,
    difficulty: "Sederhana",
    ingredients: [
      { id: "1", name: "Daging ayam cincang", amount: "500g" },
      { id: "2", name: "Bawang merah", amount: "2 ulas (dihiris halus)" },
      { id: "3", name: "Bawang putih", amount: "2 ulas (dihiris halus)" },
      { id: "4", name: "Roti putih", amount: "2 keping (direndam dalam susu)" },
      { id: "5", name: "Telur", amount: "1 biji" },
      { id: "6", name: "Keju krim", amount: "200g" },
      { id: "7", name: "Susu", amount: "1/2 cawan" },
      { id: "8", name: "Garam", amount: "1 sudu teh" },
      { id: "9", name: "Lada hitam", amount: "1/2 sudu teh" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Campurkan daging ayam, bawang merah, bawang putih, roti yang direndam, telur, garam dan lada. Gaul hingga sebati.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Bentuk adunan menjadi bebola. Panaskan minyak dan goreng bebola hingga masak dan keemasan.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Untuk sos, panaskan keju krim dan susu dengan api perlahan hingga cair. Hidangkan bebola dengan sos keju krim.",
      },
    ],
    nutrition: {
      calories: 285,
      totalFat: 18.2,
      protein: 22.5,
      carbohydrate: 8.7,
      cholesterol: 95.8,
    },
    imageUrl: "https://images.unsplash.com/photo-1608039829573-8038a8eaf608?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Pancake Buah dengan Oren dan Blueberry",
    description:
      "Pancake yang penuh dengan buah-buahan segar - oren dan blueberry. Manis, sihat dan sempurna untuk memulakan hari anda.",
    category: "Sarapan",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Tepung gandum", amount: "1 cawan" },
      { id: "2", name: "Telur", amount: "2 biji" },
      { id: "3", name: "Susu", amount: "1 cawan" },
      { id: "4", name: "Oren", amount: "1 biji (dipotong)" },
      { id: "5", name: "Blueberry", amount: "1/2 cawan" },
      { id: "6", name: "Gula", amount: "2 sudu besar" },
      { id: "7", name: "Serbuk penaik", amount: "1 sudu teh" },
      { id: "8", name: "Mentega", amount: "2 sudu besar" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Campurkan tepung, gula dan serbuk penaik. Dalam mangkuk lain, pukul telur dan susu. Gabungkan kedua-dua campuran.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Masukkan oren dan blueberry ke dalam adunan. Kacau perlahan.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Panaskan kuali dengan mentega. Tuang adunan dan masak hingga keemasan di kedua-dua belah. Hidangkan panas.",
      },
    ],
    nutrition: {
      calories: 220,
      totalFat: 7.8,
      protein: 8.5,
      carbohydrate: 32.2,
      cholesterol: 85.4,
    },
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Ayam dan Nasi Satu Periuk",
    description:
      "Hidangan lengkap ayam dan nasi yang dimasak dalam satu periuk. Mudah, cepat dan sangat sedap. Sempurna untuk makan tengah hari atau makan malam.",
    category: "Makan Tengah Hari",
    prepTime: 15,
    cookTime: 30,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Ayam", amount: "500g (dipotong)" },
      { id: "2", name: "Beras", amount: "2 cawan" },
      { id: "3", name: "Bawang merah", amount: "3 ulas (dihiris)" },
      { id: "4", name: "Bawang putih", amount: "2 ulas (dihiris)" },
      { id: "5", name: "Halia", amount: "1 inci (dihiris)" },
      { id: "6", name: "Serai", amount: "2 batang" },
      { id: "7", name: "Daun pandan", amount: "2 helai" },
      { id: "8", name: "Garam", amount: "1 sudu teh" },
      { id: "9", name: "Air", amount: "3 cawan" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Tumis bawang merah, bawang putih dan halia hingga wangi. Masukkan ayam dan tumis hingga separuh masak.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Masukkan beras, serai, daun pandan, garam dan air. Kacau sebati.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Tutup periuk dan masak dengan api sederhana hingga nasi masak dan air kering. Biarkan reneh selama 10 minit sebelum dihidangkan.",
      },
    ],
    nutrition: {
      calories: 385,
      totalFat: 12.5,
      protein: 25.8,
      carbohydrate: 42.3,
      cholesterol: 75.2,
    },
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Pasta Ayam dan Bacon Berkrim",
    description:
      "Pasta yang berkrim dan sedap dengan ayam dan bacon. Hidangan yang mengenyangkan dan sempurna untuk makan malam keluarga.",
    category: "Makan Tengah Hari",
    prepTime: 15,
    cookTime: 25,
    difficulty: "Sederhana",
    ingredients: [
      { id: "1", name: "Pasta", amount: "400g" },
      { id: "2", name: "Ayam", amount: "300g (dipotong)" },
      { id: "3", name: "Bacon", amount: "100g (dipotong)" },
      { id: "4", name: "Krim masakan", amount: "200ml" },
      { id: "5", name: "Bawang putih", amount: "3 ulas (dihiris)" },
      { id: "6", name: "Keju parmesan", amount: "50g (diparut)" },
      { id: "7", name: "Garam", amount: "Secukup rasa" },
      { id: "8", name: "Lada hitam", amount: "Secukup rasa" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Rebus pasta mengikut arahan pembungkusan. Tiriskan dan ketepikan.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Goreng bacon hingga rangup. Masukkan ayam dan masak hingga masak. Masukkan bawang putih dan tumis hingga wangi.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Masukkan krim masakan, keju parmesan, garam dan lada. Kacau hingga sebati. Masukkan pasta dan gaul. Hidangkan panas.",
      },
    ],
    nutrition: {
      calories: 485,
      totalFat: 22.5,
      protein: 28.7,
      carbohydrate: 42.8,
      cholesterol: 95.6,
    },
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    author: "JomMasakResepi",
  },
  {
    title: "Salad Buah Tropika dengan Superfood",
    description:
      "Salad buah yang segar dan penuh dengan nutrien dari buah-buahan tropika dan superfood. Sihat, lazat dan menyegarkan.",
    category: "Vegan",
    prepTime: 15,
    cookTime: 0,
    difficulty: "Mudah",
    ingredients: [
      { id: "1", name: "Mangga", amount: "1 biji (dipotong)" },
      { id: "2", name: "Nanas", amount: "1/2 biji (dipotong)" },
      { id: "3", name: "Pisang", amount: "2 biji (dipotong)" },
      { id: "4", name: "Strawberi", amount: "10 biji" },
      { id: "5", name: "Blueberry", amount: "1/2 cawan" },
      { id: "6", name: "Chia seeds", amount: "1 sudu besar" },
      { id: "7", name: "Madu", amount: "2 sudu besar" },
      { id: "8", name: "Jus limau", amount: "1 sudu besar" },
    ],
    directions: [
      {
        id: "1",
        step: 1,
        instruction:
          "Potong semua buah-buahan dan letakkan dalam mangkuk besar.",
      },
      {
        id: "2",
        step: 2,
        instruction:
          "Campurkan madu dan jus limau untuk sos. Tuang ke atas buah-buahan.",
      },
      {
        id: "3",
        step: 3,
        instruction:
          "Taburkan chia seeds di atas. Gaul perlahan dan hidangkan sejuk.",
      },
    ],
    nutrition: {
      calories: 185,
      totalFat: 2.5,
      protein: 3.2,
      carbohydrate: 42.8,
      cholesterol: 0,
    },
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    author: "JomMasakResepi",
  },
];

