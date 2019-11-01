import Router from 'koa-router';
import config from '../dbs/config';
import Province from '../models/province';
import axios from './axios';

const { sign, requestUrl } = config;
const router = new Router({
    prefix: '/geo'
})

router.get('/getPosition', async function(ctx) {
    let url = `${requestUrl}/geo/getPosition?sign=${sign}`;
    let { status, data: { province, city } } = await axios.get(url);
    if (status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})
router.get('/province', async function(ctx) {
    let result = await Province.find();
    ctx.body = {
        province: result.map(item => {
            return {
                id: item.id,
                name: item.value[0]
            }
        })
    }

})
router.get('/province/:id', async function(ctx) {
    // let result = await City.findOne({id:ctx.params.id});
    // ctx.body = {
    //     code:0,
    //     city:city.value.map(item=>{
    //         return {
    //             province:item.province,
    //             id:item.id,
    //             name:item.name
    //         }
    //     })
    // }

})
router.get('/city', async function(ctx) {
    // let city = [];
    // let result = await City.find();
    //  result.forEach(item=>{
    //      city=city.concat(item.value)
    //  })
    // ctx.body = {
    //     code:0,
    //     city:city.value.map(item=>{
    //         return {
    //             province:item.province,
    //             id:item.id,
    //             name:item.name==='市辖区'||item.name==='省直辖县级行政区划'?item.province:item.name
    //         }
    //     })
    // }


})
router.get('/hotcity', async function(ctx) {


})
router.get('/menu', async function(ctx) {
    let url = `${requestUrl}/geo/menu?sign=${sign}`;
    let { status, data: { menu } } = await axios.get(url);
    if (status === 200) {
        ctx.body = {
            menu
        }
    } else {
        ctx.body = {
            menu: []
        }
    }

})

export default router;