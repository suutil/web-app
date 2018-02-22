import { APIService } from './api/api.service';
import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'


@Injectable()
export class ShopService {
    private favoriteShopsService: any
    private tagService: any
    private categoryService: any
    private shopsService: any
    private favoritesService: any
    countries: any = [{ code: 'ESP', spanishName: 'España' }, { code: 'PRT', spanishName: 'Portugal' },
        { code: 'FRA', spanishName: 'Francia' }, { code: 'ITA', spanishName: 'Italia' }, { code: 'DNK', spanishName: 'Dinamarca' },
        { code: 'NLD', spanishName: 'Países bajos' }, { code: 'DEU', spanishName: 'Alemania' }, { code: 'NOR', spanishName: 'Noruega' },
        { code: 'SWE', spanishName: 'Suecia' }, { code: 'BEL', spanishName: 'Bélgica' }, { code: 'GBR', spanishName: 'Reino Unido' },
        { code: 'IRL', spanishName: 'Irlanda' }, { code: 'AUT', spanishName: 'Austria' }, { code: 'CZE', spanishName: 'República Checa' },
        { code: 'POL', spanishName: 'Polonia' }, { code: 'RUS', spanishName: 'Rusia' }, { code: 'TUR', spanishName: 'Turquía' },
        { code: 'USA', spanishName: 'Estados Unidos' }, { code: 'AUS', spanishName: 'Australia' }, { code: 'OTRO', spanishName: 'OTRO' }
    ]


    constructor(private apiService: APIService,
        private feathersDataResourceService: FeathersDataResourceService) {
        this.favoriteShopsService = this.apiService.getService('favorite-shops')
        this.favoritesService = this.apiService.getService('favorites')

        this.tagService = this.apiService.getService('tag')
        this.categoryService = this.apiService.getService('category')
        this.shopsService = this.apiService.getService('shops')
    }

    // ------------------- CREATE & UPDATE -------------- \\

    createShop(providerId) {
        return this.shopsService.create({ provider: providerId })
    }

    updateShop(id, datas) {
        return this.shopsService.patch(id, datas)
    }

    getShops(){
      return this.shopsService.find({})
    }
    getActiveShops() {
      let params = {
          query: {
              approved: true
          }
      }
        return this.shopsService.find(params)
    }

    getShopByProvider(id) {
        let params = {
            query: {
                provider: id
            }
        }
        return this.shopsService.find(params)
    }

    getShop(id) {
        return this.shopsService.get(id)
    }

    getActiveShopIds() {
        let params = {
            query: {
                $sort: { 'createdAt': -1 },
                $select: {
                    shopName: 1,
                }
            }
        }
        return this.shopsService.find(params)
    }

    setShopCategory(categoryId, shopId) {
        let params = {
            $addToSet: {
                categories: categoryId
            }
        }
        return this.shopsService.update(shopId, params)
    }

    setShopSubcategory(categoryId, subcategoryId, shopId) {
        let params = {
            $addToSet: {
                categories: {
                    $each: [categoryId, subcategoryId]
                }
            }
        }
        return this.shopsService.update(shopId, params)
    }

    resetShopCategory(categoryId, shopId) {
        let params = {
            $pull: {
                categories: categoryId
            }
        }
        return this.shopsService.update(shopId, params)
    }


    // ------------------- FAVORITE --------------------- \\


    addToFavorites(shopId) {
        let userId = this.apiService.getUserId()
        let params = {
            $addToSet: {
                favorites: shopId
            }
        }
        return this.favoriteShopsService.update(userId, params)
    }

    removeFromFavorites(shopId) {
        let userId = this.apiService.getUserId()
        let params = {
            $pull: {
                favorites: shopId
            }
        }
        return this.favoriteShopsService.update(userId, params)
    }

    getFavorites() {
        let params = {
            query: {
                _id: this.apiService.getUserId(),
            }
        }
        return this.favoriteShopsService.find(params)
    }

    // ------------------- LIKES --------------------------\\

    likeShop(shopId) {
        let userId = this.apiService.getUserId()
        let params = {
            $addToSet: {
                likes: userId
            }
        }
        return this.shopsService.update(shopId, params)
    }

    unlikeShop(shopId) {
        let userId = this.apiService.getUserId()
        let params = {
            $pull: {
                likes: userId
            }
        }
        return this.shopsService.update(shopId, params)
    }

    getMostLikedShops(number) {
        let params = {
            query: {
                $where: "this.likes.length > 19 "
            }
        }
        return this.shopsService.find(params)
    }

    // ------------------- TAGS ---------------------------\\

    createTag(tag) {
        return this.tagService.create({ tagName: tag })
    }

    tagShop(tagId, shopId) {
        let params = {
            $addToSet: {
                tags: tagId
            }
        }
        return this.shopsService.update(shopId, params)
    }

    untagShop(tagId, shopId) {
        let params = {
            $pull: {
                tags: tagId
            }
        }
        return this.shopsService.update(shopId, params)
    }


    getTags() {
        return this.tagService.find({})
    }


    getShopsFromTag(tagId) {
        let params = {
            query: {
                tags: tagId
            }
        }
        return this.shopsService.find(params)
    }

    getActiveTags() {
        let params = {
            query: {
                active: true
            }
        }
        return this.tagService.find(params)
    }

    changeTagName(id, newName) {
        return this.tagService.patch(id, { tagName: newName })
    }


    disableTag(tagId) {
        return this.tagService.patch(tagId, { active: false })
    }

    enableTag(tagId) {
        return this.tagService.patch(tagId, { active: true })
    }

    // ------------------- CATEGORY ---------------------------\\


    createCategory(category) {
        return this.categoryService.create({ categoryName: category, type: 'category', upperCaseName: category })
    }

    createSubcategory(category, parentCategory) {
        return this.categoryService.create({ categoryName: category, type: 'subcategory', parentCategory: parentCategory, upperCaseName: category })
            .then(subCategory => {
                this.categoryService.update(parentCategory, {
                    $addToSet: {
                        subCategories: subCategory
                    }
                })
            })
            .then(result => {})
    }

    disableCategory(categoryId) {
        return this.categoryService.patch(categoryId, { enabled: false })
    }

    enableCategory(categoryId) {
        return this.categoryService.patch(categoryId, { enabled: true })
    }

    changeCategoryName(id, name) {
        return this.categoryService.patch(id, { categoryName: name })
    }

    getCategories() {
        let params = {
            query: {
                type: 'category'
            }
        }
        return this.categoryService.find(params)
    }

    getAllActiveCategories() {
        let params = {
            query: {
                enabled: true
            }
        }
        return this.categoryService.find(params)
    }

    getSubcategories() {
        return this.categoryService.find({ type: 'subcategory' })
    }

    getAllCategories() {
        return this.categoryService.find()
    }

    buildCategoryDatas(categories) {
        let parentCategories = categories.filter(category => { return category.type === "category" })
        let subCategories = categories.filter(category => { return category.type === 'subcategory' })
        let categoryDatas = []
        parentCategories.forEach(cat => {
            let category = cat
            category.subCategories = category.subCategories
                .map(SubCategoryId => {
                    for (let i = 0; i < subCategories.length; i++) {
                        if (subCategories[i]._id === SubCategoryId)
                            return subCategories[i];
                    }
                })
            categoryDatas.push(category)
        })
        return categoryDatas
    }

    getShopsByCategory(categoryId) {
        let params = {
            query: {
                categories: categoryId
            }
        }
        return this.shopsService.find(params)
    }

    //------------- NEW SHOPS-----------------------\\

    getNewShops(days) {

        let from = new Date();
        var to = new Date();
        from.setDate(from.getDate() - days);
        let params = {
            query: {
                createdAt:
                {
                    $gte: from
                }
            }
        }
        return this.shopsService.find(params)

    }

    //--------------- COUNTRIES ------------------------

    getCountries() {
        return this.countries
    }

    getShopsByCountry(country) {
        let params = {
            query: {
                country: country
            }
        }
        return this.shopsService.find(params)
    }

}
