// sıralama , filtreleme , alan limitleme , sayfalama gibi özellikleri projede birden fazla noktada kullanmak gerektiginde kod kalabanaligini ngellemek adina bir class olusturup indan ornek alarak yapiyoruz.

class APIFeatures {
  constructor(query, params, formattedParams) {
    this.query = query; // olusturulan veritabanı sorgusu
    this.params = params; // api isteginden gelen formatlanmamis parametreler
    this.formattedParams = formattedParams; // midw'dan gelen formatlanmıs parametreler
  }

  filter() {
    this.query = this.query.find(this.formattedParams);

    return this;
  }

  sort() {
    // eğer sort parametresi varsa sırala
    if (this.params.sort) {
      this.query.sort(this.params.sort.split(",").join(" "));
    } else {
      this.query.sort("-createdAt");
    }

    return this;
  }

  limit() {
    // limit parametresi varsa alan limitle(alan limitleme)
    if (this.params.fields) {
      this.query.select(this.params.fields.replaceAll(",", " "));
    }

    return this;
  }

  pagination() {
  const page = Number(this.params.page) || 1; // varsayılan 1. sayfa
  const limitCount = Number(this.params.limit) || 10; // varsayılan limit 10
  const skipCount = (page - 1) * limitCount;

  // Sayfa sayısı 1'den küçükse, bunu 1 olarak ayarla
  if (page < 1) {
    page = 1;
  }

  this.query.skip(skipCount).limit(limitCount);
  
  return this;
}
}

module.exports = APIFeatures;
