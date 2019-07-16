<template>
    <div class="certification_body">
        <yd-navbar :title="chang">
        </yd-navbar>
        <!-- 头部 -->
        <div class="center" style="padding-top:12px">
            <div class="center-content">
                <yd-step current="1" current-color="#1D75D6">
                    <yd-step-item>
                        <span slot="bottom">实名认证</span>
                    </yd-step-item>
                    <yd-step-item>
                        <span slot="bottom">基本信息</span>
                    </yd-step-item>
                    <!--暂时移除
                <yd-step-item>
                    <span slot="top">人脸识别</span>
                </yd-step-item>
                -->
                </yd-step>
            </div>
        </div>
        <yd-progressbar type="line" :progress="progress4" trail-width="1" trail-color="#1d75d6" stroke-width="1"></yd-progressbar>
        <!-- 身体的部分 -->
        <div class="center">
            <div class="center-content">
                <input type="file" accept="image/*" id="stridCardPhoto" @change="uploadFile($event,onUploadProgress)" />
                <!-- capture="camera" 添加这个属性可以直接打开相机 -->
                <input type="file" accept="image/*" id="stridCardBackPhoto" @change="uploadFile($event,onUploadProgress)" />
                <!-- capture="camera" 添加这个属性可以直接打开相机 -->
                <input type="file" accept="image/*" id="strbankCardPhoto" @change="uploadFile($event,onUploadProgress)" />
                <!-- capture="camera" 添加这个属性可以直接打开相机 -->
                <input type="file" accept="image/*" id="strpersonPhoto" @change="uploadFile($event,onUploadProgress)" />
                <!-- capture="camera" 添加这个属性可以直接打开相机 -->
                <div class="certification-pic">
                    <div class="pic" :style="{backgroundImage: 'url(' + stridCardPhoto + ')'}">
                        <div @click="openActionsheet('stridCardPhoto')" class="photo">
                            <img src="../../lib/public/images/camera.png" alt="...">
                            <p>拍摄身份证正面照片</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="pic1" :style="{backgroundImage: 'url(' + stridCardBackPhoto + ')'}">
                        <div @click="openActionsheet('stridCardBackPhoto')" class="photo">
                            <img src="../../lib/public/images/camera.png" alt="...">
                            <p>拍摄身份证背面照片</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="pic2" :style="{backgroundImage: 'url(' + strbankCardPhoto + ')'}">
                        <div @click="openActionsheet('strbankCardPhoto')" class="photo">
                            <img src="../../lib/public/images/camera.png" alt="...">
                            <p>拍摄银行卡正面照片</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="pic3" :style="{backgroundImage: 'url(' + strpersonPhoto + ')'}">
                        <div @click="openActionsheet('strpersonPhoto')" class="photo">
                            <img src="../../lib/public/images/camera.png" alt="...">
                            <p>拍摄手持身份证正面照片</p>
                        </div>
                    </div>
                    <br>
                    <input type="button" value="下一步" @click="func" style="width:100%">
                    <br>
                </div>
            </div>
        </div>
        <div class= "ceng" v-if="progress4!=0">
            <div class="line">
                 <h1>{{complete}}</h1>
            </div>
           
        </div>
    </div>
</template>
<script>
    import Exif from 'exif-js';
    import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';
    import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
    import {
        USERINFO
    } from '../../store/types'
    import {
        R_parse_url
    } from '../../util/Regular';
    export default {
        data() {
            return {
                show1: false,
                progress4: 0.0,
                chang: "实名认证",
                myItems1: [{
                    label: '拍照',
                    callback: (e) => {
                        e.click();
                    }
                }, ],
                stridCardPhoto: '../../lib/public/images/e2.png',
                stridCardBackPhoto: '../../lib/public/images/e.png',
                strbankCardPhoto: '../../lib/public/images/e3.png',
                strpersonPhoto: '../../lib/public/images/e1.png',
                userInfo: {}
            }
        },
        computed:{
            readonly:function () {
                let userInfo = JSON.parse(this.$store.state[USERINFO]); //获取用户信息
                return userInfo.customer.realnamestate==1 || userInfo.customer.realnamestate==2 || userInfo.customer.realnamestate==5;
            },
            complete:function(){
                if(this.progress4==0.99){
                    return "已上传100%，服务器处理中...";
                }
                return "已上传"+this.progress4*100 + "%";
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu = true;
            })
        },
        created() {
            this.init();
        },
        mounted() {
        },
        methods: {
            async init() {
                let data = await this.$axios.get("/customer/realNameShow/get:img");
                console.log(data.data);
                this.userInfo = data.data; //获取用户信息
                console.log(this.userInfo);
                //判断用户信息里面图片是否存在
                if (R_parse_url.test(this.userInfo.idimage4)) {
                    this.strpersonPhoto = this.userInfo.idimage4;
                }
                if (R_parse_url.test(this.userInfo.idimage3)) {
                    this.strbankCardPhoto = this.userInfo.idimage3;
                }
                if (R_parse_url.test(this.userInfo.idimage2)) {
                    this.stridCardBackPhoto = this.userInfo.idimage2;
                }
                if (R_parse_url.test(this.userInfo.idimage1)) {
                    this.stridCardPhoto = this.userInfo.idimage1;
                }
            },
            func() {
                if (R_parse_url.test(this.strpersonPhoto) && R_parse_url.test(this.strbankCardPhoto) && R_parse_url.test(this.stridCardBackPhoto) && R_parse_url.test(this.stridCardPhoto)) {
                    this.userInfo.idimage4 = this.strpersonPhoto;
                    this.userInfo.idimage3 = this.strbankCardPhoto;
                    this.userInfo.idimage2 = this.stridCardBackPhoto;
                    this.userInfo.idimage1 = this.stridCardPhoto;
                    localStorage.setItem("certification", JSON.stringify(this.userInfo)); //图片存入缓存
                    this.$router.push({
                        name: "base"
                    }) //跳转下一页
                } else {
                    this.$dialog.toast({
                        mes: "请上传全部照片",
                        timeout: 1500
                    })
                }
            },
            click(e) { //打开底部弹出菜单
                e.click();
            },
            openActionsheet(inputid) {
                if(this.readonly){

                }else{
                    document.getElementById(inputid).click();
                }
            },
            onUploadProgress(progressEvent){
                console.log(progressEvent);
                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) / 100;
                if(complete!=1){
                    this.progress4 = complete;
                }else{
                    this.progress4 = 0.99;
                }
            },
            // 上传文件
            async uploadFile(e,fn) {
                // this.avatarFile = e.target.value
                let id = event.target.id; //获取input文件id
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.avatarFile = files[0];
                let param = new FormData(); //创建form对象
                param.append('file', this.avatarFile); //通过append向form对象添加数据
                let data = null;
                try {
                    data = await this.$axios.postF("/customer/customerUploadImg", param, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    },fn);
                }catch (e) {
                    console.log(e);
                }


                if (data !=null && "00" == data.state) {
                    this[id] = data.data.imgUrl;//获取返回的url
                    // this.imgPreview(this.avatarFile,id);//url加载的比较慢，所以用base64回显
                }else{
                    this.$dialog.toast({
                        mes: data.msg,
                        timeout: 1500
                    })
                }
                this.progress4 = 0.0;
                //console.log('image', this.avatarFile);
            },
            imgPreview(file, fileid) { //这个方法处理文件，现在不用
                console.log("imgPreview start");
                let self = this;
                let Orientation;
                // 去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function() {
                    Orientation = Exif.getTag(this, 'Orientation');
                });
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function() {
                        console.log("onloadend start");
                        let result = this.result;
                        self.postImg(fileid,result);

                        /*let img = new Image();
                        img.src = result;
                        // 判断图片是否大于100K,是就直接上传，反之压缩图片
                        if (this.result.length <= 1024 * 1024 * 1024) {
                            self.headerImage = this.result;
                            self.postImg(fileid,result);
                        } else {
                            img.onload = function() {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.postImg(fileid,result);
                            };
                        }*/


                    };
                }
            },
            postImg(fileid,base64img) {
                // 这里写接口
                console.log("postImg start");
                console.log(this);
                this[fileid] = base64img;
            },
            rotateImg(img, direction, canvas) {
                // 最小与最大旋转方向，图片旋转4次后回到原方向
                const minStep = 0;
                const maxStep = 3;
                if (img == null) return;
                // img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                    step = minStep;
                }
                if (direction === 'right') {
                    step++;
                    // 旋转到原位置，即超过最大值
                    step > maxStep && (step = minStep);
                } else {
                    step--;
                    step < minStep && (step = maxStep);
                }
                // 旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            compress(img, Orientation) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 瓦片canvas
                let tCanvas = document.createElement('canvas');
                let tctx = tCanvas.getContext('2d');
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    console.log('大于400万像素');
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // 如果图片像素大于100万则使用瓦片绘制
                let count;
                if ((count = width * height / 1000000) > 1) {
                    console.log('超过100W像素');
                    count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(
                                img,
                                i * nw * ratio,
                                j * nh * ratio,
                                nw * ratio,
                                nh * ratio,
                                0,
                                0,
                                nw,
                                nh
                            );
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                // 修复ios上传图片的时候 被旋转的问题
                if (Orientation !== '' && Orientation !== 1) {
                    switch (Orientation) {
                        case 6: // 需要顺时针（向左）90度旋转
                            this.rotateImg(img, 'left', canvas);
                            break;
                        case 8: // 需要逆时针（向右）90度旋转
                            this.rotateImg(img, 'right', canvas);
                            break;
                        case 3: // 需要180度旋转
                            this.rotateImg(img, 'right', canvas); // 转两次
                            this.rotateImg(img, 'right', canvas);
                            break;
                    }
                }
                // 进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log(
                    '压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%'
                );
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            }
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
    }
</script>
<style scoped>
    .center-content {
        padding-left: 10px;
        padding-right: 10px
    }
    .center {
        background-color: #fff
    }
    .yd-navbar {
        border-bottom: 1px solid
    }
    .ceng{
        width: 100%;
        height: 100%;
        z-index: 1500;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
    }
    .line{
        height: 60px;
        position: absolute;
        top: 50%;
         left: 50%;
         transform: translate(-50%,-50%);
    }
    img {
        width: 60px;
        height: 60px;
    }
    .certification-pic {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
    }
    /* .mui-popover-bottom{
            display: none;
        } */
    .yd-btn-block {
        height: 1.9rem;
    }
    .photo {
        background-color: rgba(0, 0, 0, 0);
        height: 158px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .pic {
        width: 100%;
        height: 158px;
        background-image: url(../../lib/public/images/e2.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        border: 1px solid #999;
    }
    .pic1 {
        margin-top: 10px;
        width: 100%;
        height: 158px;
        background-image: url(../../lib/public/images/e.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        border: 1px solid #999;
    }
    .pic2 {
        margin-top: 10px;
        width: 100%;
        height: 158px;
        background-image: url(../../lib/public/images/e3.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        border: 1px solid #999;
    }
    .pic3 {
        margin-top: 10px;
        width: 100%;
        height: 158px;
        background-image: url(../../lib/public/images/e1.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        border: 1px solid #999;
    }
    input[type=file] {
        display: none;
    }
</style>


