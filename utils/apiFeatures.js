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
    // sort parametresi varsa sırala
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
    // sayfalama yap
    const page = Number(this.params.page) || 1; // mevcut sayfa sayısı
    const limitCount = Number(this.params.limit) || 10; // sayfa basına dusen elaman sayısı
    const skipCount = (page - 1) * limitCount; // mevcut sayfa icin kaç eleman atlanmalı

    this.query.skip(skipCount).limit(limitCount);

    return this;
  }
}

module.exports = APIFeatures;
