<template>
	<div class="addcontrol-content">
		<yd-navbar :title="chang"></yd-navbar>
		<!-- 第一个地址 -->
         <div class="center">
			<div class="addcontrol-body">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" v-for="(adr,key) in dataList" :key="key" v-if="!adr.isdelete" @click="selectLi(adr)">
							<div class="mui-slider-right mui-disabled">
								<a class="mui-btn mui-btn-yellow" @click="setDefault(adr,key)">设置默认</a>
								<a class="mui-btn mui-btn-red" @click="del(adr,key)">删除</a>
							</div>
							<div class="mui-slider-handle">
								<div class="mui-table-cell">
									<div class="add-left">
										<div class="add-header">
											<h1>{{adr.name}}</h1>
											<h2>
												{{adr.phonenumber}}
												<yd-badge type="danger" v-if="adr.isdefault">默认地址</yd-badge>
											</h2>
										</div>
										<p>{{adr.detailaddress}}</p>
									</div>
									<router-link tag="div" class="add-right" :to="'/address/'+ adr.id">
										<yd-icon name="compose" color="#1D75D6"></yd-icon>
									</router-link>
								</div>
							</div>
						</li>
				</ul>
			</div>

		<yd-button-group>
			<yd-button size="large" type="primary" @click.native="userheader" color="#fff">+新增地址</yd-button>
		</yd-button-group>
	</div>
    </div>
</template>
<script>
    import '../../lib/mui/js/mui.js'
	import {FROMCOMPONENT} from '../../store/types';
    export default {
        data() {
            return {
                chang: "地址管理",
                dataList:[]
            }
        },
        created() {
            this.init()
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
            selectLi(obj){
                console.log("addcontrol selectLi start");
                console.log(this.$store.state[FROMCOMPONENT]);
                if("/order"==this.$store.state[FROMCOMPONENT].path){
                    localStorage.setItem("addcontrol",JSON.stringify(obj));
					this.$router.back(-1);
				}
                console.log("addcontrol selectLi end");
			},
            userheader() {
                this.$router.push({name: "/address"})
            },
            async init() {
                let data = await this.$axios.get("/custaddress/select");
                this.dataList = data.data;

            },
            async del(obj,key){
                console.log("删除");

                let data = await this.$axios.deleteData("/custaddress/del/" + obj.id);
                if(data.state == "00"){
                    this.dataList.splice(key,1);
				}
            },
            async setDefault(obj,key){
                console.log("设置默认");
                let data = await this.$axios.put("/custaddress/set/" + obj.id);
                if(data.state == "00"){
                    for(let i=0;i<this.dataList.length;i++){
                        console.log(this.dataList[i]);
                        if(this.dataList[i].isdefault == 1){
                            this.dataList[i].isdefault = !this.dataList[i].isdefault;
                            break;
                        }
                    }
					this.dataList[key].isdefault = !this.dataList[key].isdefault;
                    // this.dataList.splice(key,1);
                }
                console.log(data);

            }
        },
        components: {}


    }
</script>
<style scoped>
    .addcontrol-content {
       background-color: #fff;
    }
    .center{
        padding-left: 8px;
        padding-right: 8px 
    }
    .mui-table-cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .add-header {
        display: flex;
        align-items: center;
    }

    .add-header h2 {
        padding-left: 10px;
        font-size: 16px;
    }

    h1 {
        font-size: 16px;
    }

    p {
        padding-top: 10px;
    }

    .yd-navbar {
        border-bottom: 1px solid
    }
	.addcontrol-content {
		padding-left: 8px;
		padding-right: 8px
	}
	.mui-table-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.mui-table-cell{
	  width: 100%;
	}
	.add-header {
	  padding-top: 12px;
		display: flex;
		align-items: center;
	}
	.add-header h2 {
		padding-left: 10px;
		font-size: 16px;
	}
	h1 {
		font-size: 16px;
	}
	p {
		padding-top: 10px;
	}
	.yd-navbar {
		border-bottom: 1px solid
	}
	.addcontrol-body{
		margin-top: 10px;
		width: 100%;
	}
	.list{
		height: 86px;
		width: 100%;
	}

</style>

