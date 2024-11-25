module.exports = (req, res, next) => {
    //* urlden gelen parametreler > { duration: { lt: '14' }, price: { gte: '497' } }
    //* mongodbnin istedigi format > { duration: { $lt: '14' }, price: { $gte: '497' } }
  
    //1) istek ile gelen parametreler erisir
    let queryObj = { ...req.query };
  
    //2) filtrelemeye tabi tutulmayacak olan parametreleri (sort,fields,page,limit) query nesnesinden kaldır
    const fields = ["sort", "limit", "page", "fields"];
    fields.forEach((el) => delete queryObj[el]);
  
    //3) replace methodunu kullanabilmek icin nesneyi stringe cevir
    let queryStr = JSON.stringify(queryObj);
  
    //4) butun operatorlerin basına $ koy
    queryStr = queryStr.replace(
      /\b(gt|gte|lte|lt|ne)\b/g,
      (found) => `$${found}`
    );
  
    //5) bu mw sonra calisan methoda nesneyi aktar
    req.formattedQuery = JSON.parse(queryStr);
  
    //6) mw sonraki  mehod calisaabilir
    next();
  };
  