<template>
  <div class="bill_content">
    <div ref="mescroll" class="mescroll">
      <div>
        <div class="center">
           <yd-tab :callback="tabCallback">
          <!--<yd-tab-panel label="全部" tabkey="0">
            <div class="bil-content" v-for="order,key in orderList" :key="key">
              <div class="bil-shop">
                <img v-lazy="'../../lib/public/images/pos.png'" alt="">
                <h2>乐刷pos机 白色</h2>
              </div>
              <hr>
              <div class="bill-delete">
                <span></span>
                <p>3434积分+99元</p>
              </div>
              <div class="bill-delete">
                <span></span>
                <div class="r">
                  <span class="mui-badge mui-badge-warning" @click="bill">订单处理中</span>&nbsp;&nbsp;&nbsp;
                  <yd-icon name="delete" size="25px" color="#000"></yd-icon>
                </div>
              </div>
            </div>
            <div class="number" v-if="orderList.length==0">
              暂无数据...
            </div>
          </yd-tab-panel>-->
          <!-- pos机 -->
          <yd-tab-panel label="pos机" :tabkey="1">
            <div class="bil-content" v-for="(order,key) in orderList" :key="key">
              <div class="bil-shop">
                <img v-lazy="'../../lib/public/images/pos.png'" alt="">
                <h2>乐刷pos机 白色</h2>
              </div>
              <hr>
              <div class="bill-delete">
                <span></span>
                <p style="color:#000">3434积分+99元</p>
              </div>
              <div class="bill-delete">
                <span></span>
                <div class="r">
                  <span class="mui-badge mui-badge-danger" @click="bill">订单处理中</span>&nbsp;&nbsp;&nbsp;
                  <yd-icon name="delete" size="25px" color="#000"></yd-icon>
                </div>
              </div>
            </div>
            <div class="number" v-if="orderList.length==0">
              暂无数据...
            </div>
          </yd-tab-panel>
          <!--<yd-tab-panel label="信用卡" tabkey="2">-->
            <!--<div class="bil-content" v-for="order,key in orderList" :key="key">-->
              <!--<div class="bil-shop">-->
                <!--<img v-lazy="'../../lib/public/images/pos.png'" alt="">-->
                <!--<h2>信用卡 消费</h2>-->
              <!--</div>-->
              <!--<hr>-->
              <!--<div class="bill-delete">-->
                <!--<span></span>-->
                <!--<p>3434积分+99元</p>-->
              <!--</div>-->
              <!--<div class="bill-delete">-->
                <!--<span></span>-->
                <!--<div class="r">-->
                  <!--<span class="mui-badge mui-badge-warning">订单处理中</span>&nbsp;&nbsp;&nbsp;-->
                  <!--<yd-icon name="delete" size="25px" color="#000"></yd-icon>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="number" v-if="orderList.length==0">-->
              <!--暂无数据...-->
            <!--</div>-->
          <!--</yd-tab-panel>-->
          <!-- 贷款 -->
          <!--<yd-tab-panel label="贷款" tabkey="3">
            <div class="bil-content" v-for="order,key in orderList" :key="key">
              <div class="bil-shop">
                <img v-lazy="'../../lib/public/images/pos.png'" alt="">
                <h2>千万贷款</h2>
              </div>
              <hr>
              <div class="bill-delete">
                <span></span>
                <p>3434积分+99元</p>
              </div>
              <div class="bill-delete">
                <span></span>
                <div class="r">
                  <span class="mui-badge mui-badge-warning">订单处理中</span>&nbsp;&nbsp;&nbsp;
                  <yd-icon name="delete" size="25px" color="#000"></yd-icon>
                </div>
              </div>
            </div>
            <div class="number" v-if="orderList.length==0">
              暂无数据...
            </div>
          </yd-tab-panel>-->
          <yd-tab-panel label="商城兑换" :tabkey="4">
            <div class="bil-content" v-for="(order,key) in orderList" :key="key">
              <div class="bil-shop">
                <img v-lazy="'../../lib/public/images/pos.png'" alt="">
                <h2>使用{{order.costpoint}}兑换{{order.money}}元</h2>
              </div>
              <hr>
              <div class="bill-delete">
                <span></span>
                <p style="color:#000">{{order.costpoint}}积分+{{order.money}}元</p>
              </div>
              <div class="bill-delete">
                <span></span>
                <div class="r"><!--0：未使用；1：已使用；2：已过期；-->
                  <span class="mui-badge mui-badge-warning" v-if="order.state==0">未使用</span>
                  <span class="mui-badge mui-badge-warning" v-if="order.state==1">已使用</span>
                  <span class="mui-badge mui-badge-warning" v-if="order.state==2">已过期</span>
                  <yd-icon name="delete" size="25px" color="#000"></yd-icon>
                </div>
              </div>
            </div>
            <div class="number" v-if="orderList.length==0">
              暂无数据...
            </div>
          </yd-tab-panel>
        </yd-tab>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'
  import {isNull} from '../../util/Is';
  export default {
    data() {
      return {
          orderList:[],
          tabkey:0//记录当前tab页
      }
    },
    created() {
        this.initMeScroll();
    },
    beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$parent.$data.showmenu =true;
            })
        },
    methods: {
      bill() {
        this.$router.push({
          name: "userbill1"
        })
      },async findOrderList(num,size){
            let params = {
                "currPage": num,
                "limit": size,
                "startTime": this.datetime3
            };
            if(this.tabkey==0){
                let res = await this.$axios.get("/order/1",params);
                if(res.state == "00" && res.data!=null){
                    console.log(res);
                    this.orderList = [res.data];
                    return this.orderList;
                }
                return [];
            }else if(this.tabkey==1){
                let res = await this.$axios.get("/cardmoney",params);
                if(res.state == "00" && !isNull(res.dataList)){
                    this.orderList = [...this.orderList,...res.dataList];
                    return res.dataList;
                }
                return [];
            }
        },
        tabCallback(label,tabkey){
          this.orderList = [];
          this.tabkey = tabkey;
          this.mescroll.destroy();//销毁MeScroll对象
          this.initMeScroll();
        },
        async upCallback(page, mescroll){
            console.log("bill upCallback start");
            let data = await this.findOrderList(page.num,page.size);
            mescroll.endSuccess(data.length);
            console.log("bill upCallback end");
        },
        downCallback(){
            this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
        },
        initMeScroll(){
            //创建MeScroll对象
            this.mescroll = new MeScroll(this.$refs.mescroll, { //在mounted初始化mescroll,确保此处配置的ref有值
                down:{callback: this.downCallback }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
                up: {
                    callback: this.upCallback,
                    toTop: {
                        //回到顶部按钮
                        src: "../../lib/public/images/top.png", //图片路径,默认null,支持网络图
                        offset: 100 //列表滚动1000px才显示回到顶部按钮
                    }
                }
            });
        }
    },
    components: {
    },
      mounted: function () {},
      beforeDestroy(){
          this.mescroll.destroy();//销毁MeScroll对象
      }
  }
</script>
<style scoped>
  .center {
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .bill_content {
    background-color: #fff
  }
  li {
    list-style: none
  }
  .bil-content {
    margin-top: 20px;
    padding-bottom: 10px;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .bil-shop {
    height: 68px;
    display: flex;
    align-items: center
  }
  .bil-shop h2 {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 400;
  }
  .bill-delete {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
  .yd-icon-delete:before {
    vertical-align: bottom;
  }
  .number{
    padding-left: 8px;
    margin: 20px;
    display: flex;
    align-items: center;
    color: #c3c3c3;
  }
</style>

