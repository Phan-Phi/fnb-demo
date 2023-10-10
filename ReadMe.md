# FNB Ecom Backend

## quick start

local development:

```sh
docker compose -f local.yml up
```

production:

```sh
COMPOSE_UID=$(id -u) COMPOSE_GID=$(id -g) docker compose -f production.yml up
```

## APIs

### pages

---

```sh
GET /api/v2/pages/
```

[detail docs](https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html)

page types:

- `home.HomePage`
- `about.AboutPage`
- `contact.ContactPage`
- `news.NewsCategoryListingPage`
- `news.NewsCategoryDetailPage`
- `news.NewsPage`
- `product.ProductCategoryListingPage`
- `product.ProductCategoryDetailPage`
- `product.ProductPage`

### settings

---

```sh
GET /api/v2/
```

example response body:

```json
{
  "id": 1,
  "logo": null,
  "favicon": null,
  "og_image": null,
  "emails": [],
  "footer_social_icon": [],
  "contact_icon": [],
  "working_times": [],
  "working_times_en": [],
  "hotlines": [],
  "seo_title": "",
  "seo_title_en": "",
  "seo_description": "",
  "seo_description_en": "",
  "company_name": "",
  "company_name_en": "",
  "tax_identification_number": "",
  "address_google_map_iframe_link": "",
  "address": "",
  "address_en": "",
  "website": "",
  "notification_order_subject": "",
  "notification_order_template": "",
  "footer_description": "",
  "footer_description_en": "",
  "site": 2
}
```

### contacts

---

```sh
POST /api/v2/contacts/
```

**note**: all fields are required

example headers:

```json
{
  "Authorization": "dummy"
}
```

example body:

```json
{
  "email": "",
  "phone_number": "",
  "name": "",
  "content": ""
}
```

example response body:

```json
{
  "email": "",
  "phone_number": "",
  "name": "",
  "content": "",
  "created": ""
}
```

### product variants

---

```sh
GET /api/v2/products/variants/?product=${product_page_id}
```

example response body:

```json
{
  "meta": {
    "total_count": 2
  },
  "next": null,
  "previous": null,
  "items": [
    {
      "id": 1,
      "images": [
        {
          "block_type": "image",
          "value": "http://demo-fnb-api.services.t-solution.vn/media/original_images/gopherme_ya9V4zM.png"
        }
      ],
      "sort_order": 0,
      "name": "test",
      "price": "20.00",
      "created": "2023-07-19T11:39:06.422431+07:00",
      "updated": "2023-07-19T11:39:06.511180+07:00",
      "product": 9
    },
    {
      "id": 2,
      "images": [
        {
          "block_type": "image",
          "value": "http://demo-fnb-api.services.t-solution.vn/media/original_images/gopherme_ya9V4zM.png"
        }
      ],
      "sort_order": 0,
      "name": "test",
      "price": "20.00",
      "created": "2023-07-19T11:39:06.592381+07:00",
      "updated": "2023-07-19T11:39:06.592426+07:00",
      "product": 10
    }
  ]
}
```

---

```sh
GET /api/v2/products/variants/${id}/
```

example response body:

```json
{
  "id": 1,
  "images": [
    {
      "block_type": "image",
      "value": "http://demo-fnb-api.services.t-solution.vn/media/original_images/gopherme_ya9V4zM.png"
    }
  ],
  "sort_order": 0,
  "name": "test",
  "price": "20.00",
  "created": "2023-07-19T11:39:06.422431+07:00",
  "updated": "2023-07-19T11:39:06.511180+07:00",
  "product": 9
}
```

### carts

---

```sh
GET /api/v2/cart/
```

**note**: on first GET, you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example response body:

```json
{
  "id": 1,
  "created": "2023-07-19T11:49:41.120457+07:00",
  "updated": "2023-07-19T11:49:41.120508+07:00",
  "customer_name": "",
  "customer_phone_number": "",
  "customer_email": "",
  "customer_address": "",
  "customer_province": 1,
  "customer_district": 1,
  "customer_ward": 1,
  "customer_note": "",
  "requested_export_tax": false,
  "export_tax_name": "",
  "export_tax_phone_number": "",
  "export_tax_email": "",
  "export_tax_company_name": "",
  "export_tax_identification_number": "",
  "export_tax_address": "",
  "status": 1
}
```

---

```sh
PUT /api/v2/cart/
PATCH /api/v2/cart/
```

**note**:

- on first PATCH (PUT), you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.
- `customer_*` fields are required
- if `requested_export_tax == true`, `export_tax_*` fields are required
- to create `order`, you need adjust `status` to 2

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example body:

```json
{
  "customer_name": "",
  "customer_phone_number": "",
  "customer_email": "",
  "customer_address": "",
  "customer_province": 1,
  "customer_district": 1,
  "customer_ward": 1,
  "customer_note": "",
  "requested_export_tax": false,
  "export_tax_name": "",
  "export_tax_phone_number": "",
  "export_tax_email": "",
  "export_tax_company_name": "",
  "export_tax_identification_number": "",
  "export_tax_address": "",
  "status": 2
}
```

example response body:

```json
{
  "id": 1,
  "created": "2023-07-19T11:49:41.120457+07:00",
  "updated": "2023-07-19T11:49:41.120508+07:00",
  "customer_name": "",
  "customer_phone_number": "",
  "customer_email": "",
  "customer_address": "",
  "customer_province": 1,
  "customer_district": 1,
  "customer_ward": 1,
  "customer_note": "",
  "requested_export_tax": false,
  "export_tax_name": "",
  "export_tax_phone_number": "",
  "export_tax_email": "",
  "export_tax_company_name": "",
  "export_tax_identification_number": "",
  "export_tax_address": "",
  "status": 1
}
```

---

```sh
DELETE /api/v2/cart/
```

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

### cart items

---

```sh
GET /api/v2/cart/items/
```

**note**: on first GET, you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example response body:

```json
{
  "meta": {
    "total_count": 1
  },
  "next": null,
  "previous": null,
  "items": [
    {
      "id": 2,
      "variant": 1,
      "order": 4,
      "sort_order": null,
      "variant_name": "test",
      "variant_unit": "",
      "variant_price": "0.00",
      "quantity": 2
    }
  ]
}
```

---

```sh
GET /api/v2/cart/items/${id}/
```

**note**: on first GET, you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example response body:

```json
{
  "id": 2,
  "variant": 1,
  "order": 4,
  "sort_order": null,
  "variant_name": "test",
  "variant_unit": "",
  "variant_price": "0.00",
  "quantity": 2
}
```

---

```sh
POST /api/v2/cart/items/
```

**note**:

- on first POST, you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.
- `quantity` have to be larger than 0

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example body:

```json
{
  "variant": 1,
  "quantity": 2
}
```

example response body:

```json
{
  "id": 2,
  "variant": 1,
  "order": 4,
  "sort_order": null,
  "variant_name": "test",
  "variant_unit": "",
  "variant_price": "0.00",
  "quantity": 2
}
```

---

```sh
PUT /api/v2/cart/items/${id}/
PATCH /api/v2/cart/items/${id}/
```

**note**:

- on first PUT (PATCH), you will receive `X-Cart-Key` header which can be stored to fetch the same cart next time.
- `quantity` have to be larger than 0

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

example body:

```json
{
  "quantity": 1
}
```

example response body:

```json
{
  "id": 2,
  "variant": 1,
  "order": 4,
  "sort_order": null,
  "variant_name": "test",
  "variant_unit": "",
  "variant_price": "0.00",
  "quantity": 1
}
```

---

```sh
DELETE /api/v2/cart/items/${id}/
```

example headers:

```json
{
  "X-Cart-Key": "asdasdasdasdasd"
}
```

### provinces

---

```sh
GET /api/v2/provinces/?search=${search}
```

example response body:

```json
{
  "meta": {
    "total_count": 63
  },
  "next": "http://demo-fnb-api.services.t-solution.vn/api/v2/provinces/?limit=20&offset=20",
  "previous": null,
  "items": [
    {
      "code": 1,
      "name": "Thành phố Hà Nội"
    },
    {
      "code": 2,
      "name": "Tỉnh Hà Giang"
    },
    {
      "code": 4,
      "name": "Tỉnh Cao Bằng"
    },
    {
      "code": 6,
      "name": "Tỉnh Bắc Kạn"
    },
    {
      "code": 8,
      "name": "Tỉnh Tuyên Quang"
    },
    {
      "code": 10,
      "name": "Tỉnh Lào Cai"
    },
    {
      "code": 11,
      "name": "Tỉnh Điện Biên"
    },
    {
      "code": 12,
      "name": "Tỉnh Lai Châu"
    },
    {
      "code": 14,
      "name": "Tỉnh Sơn La"
    },
    {
      "code": 15,
      "name": "Tỉnh Yên Bái"
    },
    {
      "code": 17,
      "name": "Tỉnh Hoà Bình"
    },
    {
      "code": 19,
      "name": "Tỉnh Thái Nguyên"
    },
    {
      "code": 20,
      "name": "Tỉnh Lạng Sơn"
    },
    {
      "code": 22,
      "name": "Tỉnh Quảng Ninh"
    },
    {
      "code": 24,
      "name": "Tỉnh Bắc Giang"
    },
    {
      "code": 25,
      "name": "Tỉnh Phú Thọ"
    },
    {
      "code": 26,
      "name": "Tỉnh Vĩnh Phúc"
    },
    {
      "code": 27,
      "name": "Tỉnh Bắc Ninh"
    },
    {
      "code": 30,
      "name": "Tỉnh Hải Dương"
    },
    {
      "code": 31,
      "name": "Thành phố Hải Phòng"
    }
  ]
}
```

### districts

---

```sh
GET /api/v2/provinces/districts/?search=${search}&province_code=${code}
```

example response body:

```json
{
  "meta": {
    "total_count": 705
  },
  "next": "http://demo-fnb-api.services.t-solution.vn/api/v2/provinces/districts/?limit=20&offset=20",
  "previous": null,
  "items": [
    {
      "code": 1,
      "name": "Quận Ba Đình",
      "province_code": 1
    },
    {
      "code": 2,
      "name": "Quận Hoàn Kiếm",
      "province_code": 1
    },
    {
      "code": 3,
      "name": "Quận Tây Hồ",
      "province_code": 1
    },
    {
      "code": 4,
      "name": "Quận Long Biên",
      "province_code": 1
    },
    {
      "code": 5,
      "name": "Quận Cầu Giấy",
      "province_code": 1
    },
    {
      "code": 6,
      "name": "Quận Đống Đa",
      "province_code": 1
    },
    {
      "code": 7,
      "name": "Quận Hai Bà Trưng",
      "province_code": 1
    },
    {
      "code": 8,
      "name": "Quận Hoàng Mai",
      "province_code": 1
    },
    {
      "code": 9,
      "name": "Quận Thanh Xuân",
      "province_code": 1
    },
    {
      "code": 16,
      "name": "Huyện Sóc Sơn",
      "province_code": 1
    },
    {
      "code": 17,
      "name": "Huyện Đông Anh",
      "province_code": 1
    },
    {
      "code": 18,
      "name": "Huyện Gia Lâm",
      "province_code": 1
    },
    {
      "code": 19,
      "name": "Quận Nam Từ Liêm",
      "province_code": 1
    },
    {
      "code": 20,
      "name": "Huyện Thanh Trì",
      "province_code": 1
    },
    {
      "code": 21,
      "name": "Quận Bắc Từ Liêm",
      "province_code": 1
    },
    {
      "code": 250,
      "name": "Huyện Mê Linh",
      "province_code": 1
    },
    {
      "code": 268,
      "name": "Quận Hà Đông",
      "province_code": 1
    },
    {
      "code": 269,
      "name": "Thị xã Sơn Tây",
      "province_code": 1
    },
    {
      "code": 271,
      "name": "Huyện Ba Vì",
      "province_code": 1
    },
    {
      "code": 272,
      "name": "Huyện Phúc Thọ",
      "province_code": 1
    }
  ]
}
```

### wards

---

```sh
GET /api/v2/provinces/districts/wards/?search=${search}&district_code=${code}
```

example response body:

```json
{
  "meta": {
    "total_count": 10598
  },
  "next": "http://demo-fnb-api.services.t-solution.vn/api/v2/provinces/districts/wards/?limit=20&offset=20",
  "previous": null,
  "items": [
    {
      "code": 1,
      "name": "Phường Phúc Xá",
      "district_code": 1
    },
    {
      "code": 4,
      "name": "Phường Trúc Bạch",
      "district_code": 1
    },
    {
      "code": 6,
      "name": "Phường Vĩnh Phúc",
      "district_code": 1
    },
    {
      "code": 7,
      "name": "Phường Cống Vị",
      "district_code": 1
    },
    {
      "code": 8,
      "name": "Phường Liễu Giai",
      "district_code": 1
    },
    {
      "code": 10,
      "name": "Phường Nguyễn Trung Trực",
      "district_code": 1
    },
    {
      "code": 13,
      "name": "Phường Quán Thánh",
      "district_code": 1
    },
    {
      "code": 16,
      "name": "Phường Ngọc Hà",
      "district_code": 1
    },
    {
      "code": 19,
      "name": "Phường Điện Biên",
      "district_code": 1
    },
    {
      "code": 22,
      "name": "Phường Đội Cấn",
      "district_code": 1
    },
    {
      "code": 25,
      "name": "Phường Ngọc Khánh",
      "district_code": 1
    },
    {
      "code": 28,
      "name": "Phường Kim Mã",
      "district_code": 1
    },
    {
      "code": 31,
      "name": "Phường Giảng Võ",
      "district_code": 1
    },
    {
      "code": 34,
      "name": "Phường Thành Công",
      "district_code": 1
    },
    {
      "code": 37,
      "name": "Phường Phúc Tân",
      "district_code": 2
    },
    {
      "code": 40,
      "name": "Phường Đồng Xuân",
      "district_code": 2
    },
    {
      "code": 43,
      "name": "Phường Hàng Mã",
      "district_code": 2
    },
    {
      "code": 46,
      "name": "Phường Hàng Buồm",
      "district_code": 2
    },
    {
      "code": 49,
      "name": "Phường Hàng Đào",
      "district_code": 2
    },
    {
      "code": 52,
      "name": "Phường Hàng Bồ",
      "district_code": 2
    }
  ]
}
```
