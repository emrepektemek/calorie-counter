import axios from "axios";


export async function filtreliTarifAl(mutfak,ogun,diyet,cesit,kalori){

    if(mutfak.length>0){
        mutfak = '&cuisineType=' + mutfak;
    }
    if(ogun.length>0){
        ogun = '&mealType=' + ogun;   
    }
    if(diyet.length>0){
        diyet = '&diet=' + diyet;      
    }
    if(cesit.length>0){
        cesit = '&dishType=' + cesit;     
    }

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf${diyet}${mutfak}${ogun}${cesit}&calories=${kalori[0]}-${kalori[1]}&random=false`;

    const dizi1 = await axios.get(url);

    return dizi1.data.hits;
}

export async function tarifAl(besinAdi){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${besinAdi}&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);

   return toplamDizi;
}

export async function diyeteGoreTarifAl(diyetAdi){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&diet=${diyetAdi}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);

   //return currentResponse.data.hits;

   return toplamDizi;

}

export async function oguneGoreTarifAl(zamanAdi){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&mealType=${zamanAdi}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);

    return toplamDizi;
}

export async function sagligaGoreTarifAl(saglik){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&health=${saglik}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);

    return toplamDizi;
}

export async function mutfagaGoreTarifAl(mutfakAdi){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&cuisineType=${mutfakAdi}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);

   //return currentResponse.data.hits;

   return toplamDizi;

}

export async function yemekCesidineGoreTarifAl(yemekTuruAdi){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&dishType=${yemekTuruAdi}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);
    
   return toplamDizi;

}

export async function kaloriyeGoreTarifAl(kalori){

    url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=a993bdae&app_key=09194dc651830734559dc65b95b13bcf&calories=${kalori}&random=false`

    let toplamDizi;

    const dizi1 = await axios.get(url);

    const dizi2 = await axios.get(dizi1.data._links.next.href);

    const dizi3 = await axios.get(dizi2.data._links.next.href);

    const dizi4 = await axios.get(dizi3.data._links.next.href);

    const dizi5 = await axios.get(dizi4.data._links.next.href);


    toplamDizi = [].concat(dizi1.data.hits, dizi2.data.hits,dizi3.data.hits,dizi4.data.hits,dizi5.data.hits);
    
   return toplamDizi;

}

export async function yiyecekAl(yiyecekAdi){

    url = `https://api.edamam.com/api/food-database/v2/parser?app_id=45c35e78&app_key=29e613576f449f3fff3a91122a04abb9&ingr=${yiyecekAdi}`

    const dizi1 = await axios.get(url);

    return dizi1.data.hints
}
