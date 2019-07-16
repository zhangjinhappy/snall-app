<template>
    <div class="address-content">
        <div class="center">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left" class="address-w">收件人：</span>
                <yd-input slot="right" required v-model="params.name" max="20" placeholder="请输入收件人名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="address-w">手机号码：</span>
                <yd-input slot="right" required ref="phone" v-model="params.phonenumber" regex="mobile" placeholder="+86填写收货人手机号"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly placeholder="请选择收货地址">
            </yd-cell-item>
        </yd-cell-group>
        <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
        <yd-cell-group title="详细地址：">
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="如具体的街，门牌号，小区，楼栋号，单元号" maxlength="100" v-model="params.detailaddress"></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <br>
        <yd-button-group>
            <yd-button size="large" type="primary" @click.native="userheader" bgcolor="#1D75D6" color="#fff">保存</yd-button>
        </yd-button-group>
    </div>
    </div>
</template>
<script>
    import District from 'ydui-district/dist/gov_province_city_area_id'
    export default {
        data(){
            return{
                show1: false,
                model1: '',
                district: District,
                params:{
                    "name": "",
                    "phonenumber": "",
                    "provincecode": "",
                    "citycode": "",
                    "areacode": "",
                    "detailaddress": ""
                }
            }
        },
        created(){
            console.log(this.did);
            this.getAddress();

        },
        computed:{
            did(){
                return this.$route.params.did;
            }
        },
        methods:{
            result1(ret) {
                console.log(ret);
                this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
                this.params.provincecode=ret.itemValue1.substring(0,2);
                this.params.citycode=ret.itemValue2.substring(0,4);
                this.params.areacode=ret.itemValue3;
            },
            async userheader(){
                let data = {};
                if(this.did!=undefined){
                    data = await this.$axios.put("/custaddress/update",this.params);
                }else{
                    data = await this.$axios.post("/custaddress/save",this.params);
                }
                console.log(data);
                if("00" === data.state){
                    this.$router.back(-1)
                }

                // this.$router.push({name:"order1"})
            },
            async getAddress(){
                if(this.did==undefined){
                    return;
                }
                let data = await this.$axios.get("/custaddress/getShowAddress/"+ this.did);

                if(data.state == "00"){
                    this.params.name = data.data.name;
                    this.params.phonenumber = data.data.phonenumber;
                    this.params.provincecode = data.data.provincecode;
                    this.params.citycode = data.data.citycode;
                    this.params.areacode = data.data.areacode;
                    this.params.detailaddress = data.data.detailaddress;
                    this.params.id = this.did;
                    this.model1 = data.data.provinceName + " " +  data.data.cityName + " " + data.data.areaName
                }
            }
        },

        beforeRouteEnter (to, from, next) {
            next(vm =>{
                vm.$parent.$data.showfooter=false
            })
        },
        beforeRouteLeave (to, from, next) {
            this.$parent.$data.showfooter=true;
            next()
        },
    }
</script>
<style scoped>
    .address-content{
      background-color: #fff;
    }
    .center{
          padding-top: 60px;
        padding-right: 8px;
        padding-left: 8px;
    }
    input[type='text'],.yd-cell-right,input[type=text]{
        margin-bottom: 0px;
    }
    .address-w{
        margin-bottom: 15px;
    }
</style>


