class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: '1'
            }
        } : {}


        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){

        const queryCopy = { ...this.queryStr }

        console.log(queryCopy);

        // Removing fileds 
        const removeFields = ['keyword', 'limit', 'page']
    }
}

module.exports = APIFeatures