<template>
    <div class="base_body">
        <yd-navbar :title="chang">
            <router-link to="/mine/certification" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <!-- 头部 -->
        <div class="base-content">
            <yd-step current="2" current-color="#1D75D6">
                <yd-step-item>
                    <span slot="bottom">实名认证</span>
                </yd-step-item>
                <yd-step-item>
                    <span slot="bottom">基本信息</span>
                </yd-step-item>
                <!--H5暂时移除
                            <yd-step-item>
                                <span slot="top">人脸识别</span>
                            </yd-step-item>
                            -->
            </yd-step>
        </div>
        <br>
        <div class="base-footer">
            <div class="center">
                <div class="center-content">
                    <div class="a">
                        <span>收款人姓名</span>
                        <input type="text" required :readonly="readonly" class="input" v-model="params.realname" placeholder="请输入姓名">
                    </div>
                    <div class="a">
                        <span>收款人身份证</span>
                        <input type="text" required :readonly="readonly" class="input" v-model="params.idcardno" placeholder="请输入身份证号">
                    </div>
                </div>
            </div>
            <div class="center" style="margin-top:10px">
                <div class="center-content">
                    <div class="a">
                        <span>银行卡号</span>
                        <input type="number" class="input" :readonly="readonly" placeholder="输入银行卡号" v-model="params.cardno">
                    </div>
                    <div class="a">
                        <span class="phone">银行预留的手机号</span>
                        <input type="text" class="input" :readonly="readonly" placeholder="输入银行卡预留手机号" v-model="params.phonenumber">
                    </div>
                    <div class="a">
                        <span>所属银行</span>
                        <div class="bankbox">
                            <select @change="setfn()" :disabled="readonly" v-model="params.bank" dir="rtl">
                                        <option value="">请选择所属银行</option>
                                        <option :value="bank.bankname" v-for="(bank,key) in banklist" :key="key">{{bank.bankname}}</option>
                             </select>
                        </div>
                        <!-- <input type="text" placeholder="请选择所属银行" list="a" v-model="params.bank" @change="setfn()">
                                    <datalist id="a">
                                        <option value=""></option>
                                        <option :value="bank.bankname" v-for="(bank,key) in banklist" :key="key"></option>
                                    </datalist> -->
                    </div>
                    <div class="a">
                        <span>银行卡开户地点</span>
                        <input slot="right" type="text" @click.stop="show2 = !readonly" v-model="params.cardCityName" readonly placeholder="请选择城市">
                        <yd-cityselect v-model="show2" :callback="result2" :items="district" :columns="2"></yd-cityselect>
                    </div>
                    <div class="a">
                        <span>开户支行</span>
                        <input type="text" class="input" placeholder="请输入银行卡支行" :readonly="readonly" v-model="params.bankname" @focus="getVal">
                    </div>
                </div>
            </div>
            <div class="center" style="margin-top:10px;height:50px;">
                <div class="center-content">
                    <yd-button size="large" type="primary" @click.native="clickname" :bgcolor="readonly?'#ccc':'#1D75D6'" color="#fff" id="btn">提交</yd-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import District from 'ydui-district/dist/gov_province_city_area_id'
    import District from '../../lib/data/province_city_area_id';
    import '../../lib/mui/js/mui.js'
    import {R_parse_nameReg} from '../../util/Regular';
    import {
        isNull
    } from '../../util/Is';
    import {
        R_parse_url
    } from '../../util/Regular';
    import {
        USERINFO
    } from '../../store/types'
    import {preDate,nextDate,thisFormatDateTime,datedifference} from '../../util/TimeUtils';
    import {IdentityCodeValid} from '../../util/IdentityCodeValid'
    export default {
        data() {
            return {
                chang: '基本信息',
                banklist: [],
                show1: false,
                show2: false,
                district: District,
                params: {
                    realname: "", //真实姓名
                    idimage4: "", //手持身份证
                    idimage3: "", //银行卡正面
                    idimage2: "", // 身份证反面
                    idimage1: "", //身份证正面
                    idcardno: "", //身份证号码
                    idcardaddress: "", //身份证地址
                    customerprovincecode: "", //证件省码
                    customercitycode: "", //证件市码
                    customerareacode: "", //证件区码
                    cardno: "", //卡号
                    phonenumber: "", //预留手机号码
                    branchbankcode: "", //支行编号
                    bankname: "", //支行名称
                    bankcode: "", //总行编号
                    bankInfoprovincecode: "", //银行省码
                    bankInfocitycode: "", //银行市码
                    bankInfoareacode: "", //银行区码
                    bank: "", //展示的所属银行
                    cityName: "", //展示的证件所在地区
                    cardCityName: "", //展示的证件开户地点
                    idstarttime : "2019-04-16",//证件开始日期
                    idendtime : "2019-04-16",//证件结束日期

                }
            }
        },
        computed:{
            readonly:function () {
               return this.userInfo.customer.realnamestate==1 || this.userInfo.customer.realnamestate==2 || this.userInfo.customer.realnamestate==5;
            }
        },
        created() {
            this.getBanks();
            this.init();
        },
        mounted(){
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showfooter = false;
                vm.$parent.$data.showmenu = false
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$parent.$data.showfooter = true;
            this.$parent.$data.showmenu = true;
            next()
        },
        methods: {
            async clickname() { //下一步方法
                // this.userInfo = JSON.parse(this.$store.state[USERINFO]); //获取用户信息
                if(this.userInfo.customer.realnamestate==1){
                    this.$dialog.toast({
                        mes: "请等待审核",
                        timeout: 1500
                    });
                    return;
                }
                if(this.userInfo.customer.realnamestate==2){
                    this.$dialog.toast({
                        mes: "审核通过了",
                        timeout: 1500
                    });
                    return;
                }
                if(this.readonly){
                    return;
                }
                let flag = this.verification();
                console.log("flag" + flag);
                if(!flag){
                    return;
                }

                let params = {
                    'customer.realname': this.params.realname,
                    'customer.idimage4': this.params.idimage4,
                    'customer.idimage3': this.params.idimage3,
                    'customer.idimage2': this.params.idimage2,
                    'customer.idimage1': this.params.idimage1,
                    'customer.idcardno': this.params.idcardno,
                    'customer.idstarttime': this.params.idstarttime,
                    'customer.idendtime': this.params.idendtime,
                    'customer.idcardaddress': this.params.idcardaddress,
                    'customer.citycode': this.params.customercitycode,
                    'bankInfo.cardno': this.params.cardno,
                    'bankInfo.phonenumber': this.params.phonenumber,
                    'bankInfo.branchbankcode': this.params.branchbankcode,
                    'bankInfo.bankname': this.params.bankname,
                    'bankInfo.bankcode': this.params.bankcode,
                    'bankInfo.citycode': this.params.bankInfocitycode,
                };
                console.log(JSON.stringify(params));
                let data = await this.$axios.post("/customer/realName", params);
                this.$store.commit(USERINFO, null);
                window.location.href = "/";
                // this.$router.push({name: "base1"})
            },
            result1(ret) { //证件地区回调方法
                console.log("点什么触发");
                console.log(ret);
                this.params.cityName = ret.itemName1 + ' ' + ret.itemName2;
                this.params.customerprovincecode = ret.itemValue1;
                this.params.customercitycode = ret.itemValue2;
            },
            result2(ret) { //开户地点所在地区回调方法
                console.log("点什么触发1");
                console.log(ret);
                this.params.cardCityName = ret.itemName1 + ' ' + ret.itemName2;
                this.params.bankInfoprovincecode = ret.itemValue1;
                this.params.bankInfocitycode = ret.itemValue2;
            },
            async getBanks() {
                if (this.banklist.length == 0) {
                    let data = await this.$axios.get("/bankTotal");
                    this.banklist = data.data 
                }
            },
            // async getUserBank() {
            //     // let data = await this.$axios.get("/bankTotal");
            //     // this.banklist = data.data;
            //     // console.log(this.banklist);
            // },
            setfn() { //设置总行编号
                for (i in this.banklist) {
                    let b = this.banklist[i];
                    if (b.bankname == this.params.bank) {
                        this.params.bankcode = b.bankcode;
                        break;
                    }
                }
            },
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            getVal() {
                // let con={bankname:this.bank,address:this.model2 }
                // this.$store.commit("addname",con)
                if(this.readonly){
                    return;
                }
                if (isNull(this.params.bankcode)) { //判断总行编号是否为空
                    this.$dialog.toast({
                        mes: "请选择银行",
                        timeout: 1500
                    })
                }
                if (isNull(this.params.bankInfocitycode)) { //判断银行市码是否为空
                    this.$dialog.toast({
                        mes: "请选择开户地点",
                        timeout: 1500
                    })
                }
                localStorage.setItem("params", JSON.stringify(this.params));
                this.$router.push({
                    name: "banklist"
                })
            },
            moment,thisFormatDateTime,
            async init() {
                console.log("base init start");
                this.userInfo = JSON.parse(this.$store.state[USERINFO]);//获取缓存数据
                this.params.idstarttime = moment(preDate()).format('YYYY-MM-DD');
                this.params.idendtime = moment(nextDate()).format('YYYY-MM-DD');
                let data = localStorage.getItem("params");
                if (!isNull(data)) {
                    this.params = JSON.parse(data);
                    localStorage.removeItem("params");
                } else {
                   await this.getInfo();
                }
                this.imageload();
                console.log("base init end");
            },
            imageload() {
                let userinfo = JSON.parse(localStorage.getItem("certification"));
                if (R_parse_url.test(userinfo.idimage4)) {
                    this.params.idimage4 = userinfo.idimage4;
                } else {
                    this.$router.back(-1);
                    return;
                }
                if (R_parse_url.test(userinfo.idimage3)) {
                    this.params.idimage3 = userinfo.idimage3;
                } else {
                    this.$router.back(-1);
                    return;
                }
                if (R_parse_url.test(userinfo.idimage2)) {
                    this.params.idimage2 = userinfo.idimage2;
                } else {
                    this.$router.back(-1);
                    return;
                }
                if (R_parse_url.test(userinfo.idimage1)) {
                    this.params.idimage1 = userinfo.idimage1;
                } else {
                    this.$router.back(-1);
                }
            },
            async getInfo() {
                console.log("getInfo---------------------");
                let data = await this.$axios.get("/customer/realNameShow/get:info");
                console.log(data);
                if(data.state == "00" && data.data != null){
                    this.params.realname = data.data[0].realname;
                    this.params.idcardno = data.data[0].idcardno;
                    this.params.idcardaddress = data.data[0].idcardaddress;
                    this.params.customercitycode = data.data[0].citycode;
                    this.params.cardno = data.data[1].cardno;
                    this.params.phonenumber = data.data[1].phonenumber;
                    this.params.branchbankcode = data.data[1].branchbankcode;
                    this.params.bankname = data.data[1].bankname;
                    this.params.bankcode = data.data[1].bankcode;
                    this.params.bankInfocitycode = data.data[1].citycode;

                    this.params.cityName = data.data[0].provinceName + " " + data.data[0].cityName;
                    // this.params.customerprovincecode = ret.itemValue1;
                    this.params.customercitycode = data.data[0].citycode;

                    this.params.cardCityName = data.data[1].provinceName + " " + data.data[1].cityName;
                    // this.params.bankInfoprovincecode = ret.itemValue1;
                    this.params.bankInfocitycode = data.data[1].citycode;

                    for (i in this.banklist) {
                        let b = this.banklist[i];
                        if(b.bankcode == data.data[1].bankcode){
                            this.params.bank = b.bankname;
                            break;
                        }
                    }
                    this.params.idstarttime = moment(data.data[0].idstarttime).format('YYYY-MM-DD');
                    this.params.idendtime =  moment(data.data[0].idendtime).format('YYYY-MM-DD');
                    console.log(this.params.idstarttime);
                    console.log(this.params.idendtime);
                    console.log(moment(data.data[0].idendtime).format('YYYY-MM-DD'));

                }
                console.log("---------------------data.data[0]");
            },
            verification(){
                if(isNull(this.params.realname)){
                    this.$dialog.toast({
                        mes: "请输入收款人姓名",
                        timeout: 1500
                    });
                    return false;
                }
                if(!R_parse_nameReg.test(this.params.realname)){
                    this.$dialog.toast({
                        mes: "请输入正确的收款人姓名",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.idcardno)){
                    this.$dialog.toast({
                        mes: "请输入收款人身份证",
                        timeout: 1500
                    });
                    return false;
                }

                let o = IdentityCodeValid(this.params.idcardno);
                if(!o.pass){
                    this.$dialog.toast({
                        mes: o.tip,
                        timeout: 1500
                    });
                    return;
                }

                if(datedifference(this.params.idstarttime,this.params.idendtime)<5){
                    this.$dialog.toast({
                        mes: "请输入正确的开始和结束日期",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.idcardaddress)){
                    this.$dialog.toast({
                        mes: "请输入身份证地址",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.customercitycode)){
                    this.$dialog.toast({
                        mes: "请选择进件城市",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.cardno)){
                    this.$dialog.toast({
                        mes: "请输入银行卡号",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.phonenumber)){
                    this.$dialog.toast({
                        mes: "请输入银行预留的手机号",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.branchbankcode)){
                    this.$dialog.toast({
                        mes: "请选择支行",
                        timeout: 1500
                    });
                    return false;
                }
                if(isNull(this.params.branchbankcode)){
                    this.$dialog.toast({
                        mes: "请选择银行卡开户地点",
                        timeout: 1500
                    });
                    return false;
                }

                return true;
            }
        },
        components: {}
    }
</script>
<style scoped>
    select {
        padding-left: 54%;
        color: #444;
        text-align: right;
    }
    .center {
        background-color: #fff;
    }
    .center-content {
        padding-left: 10px;
        padding-right: 10px
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .phone {
        width: 140px;
        text-align: left;
        height: 40px;
        line-height: 40px;
    }
    .base-content {
        padding-top: 20px;
        background-color: #fff;
    }
    .yd-preview-header {
        padding-right: 8px;
        /* border-bottom: 1px solid #ccc; */
    }
    input[type='text'],
    textarea,
    input[type='number'] {
        border: 1px solid rgba(0, 0, 0, 0);
    }
    input,
    textarea {
        text-align: right;
    }
    textarea {
        padding-right: 15px;
        padding-top: 10px;
        height: 40px;
    }
    span {
        width: 100px;
    }
    .a {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
    }
    .b {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #btn {
        border-radius: 8px;
    }
    .input {
        text-align: right;
        border: 0;
    }
    input[type='text'],
    input[type='number'] {
        width: 80%;
        margin-bottom: 0px;
        background-color: rgba(0, 0, 0, 0)
    }
    .bankbox {
      width: 57%;
      height: 40px;
    }
    select{
        direction: rtl;
    }
</style>

