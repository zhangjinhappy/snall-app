<template>
	<div class="addcontrol-content">
		<yd-navbar :title="chang"></yd-navbar>
		<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-yellow">默认管理</a>
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
							<div class="add-left">
								<div class="add-header">
									<h1>张三</h1>
									<h2>12345678
										<yd-badge type="danger">默认地址</yd-badge>
									</h2>
								</div>
								<p>安徽省合肥市包河区包河花园5栋403室</p>
							</div>
							<router-link tag="div" class="add-right" to="/address">
								<yd-icon name="compose" color="#1D75D6"></yd-icon>
							</router-link>
						</div>
					</div>
				</li>
					<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-yellow">默认管理</a>
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
							<div class="add-left">
								<div class="add-header">
									<h1>张三</h1>
									<h2>12345678
										<yd-badge type="danger">默认地址</yd-badge>
									</h2>
								</div>
								<p>安徽省合肥市包河区包河花园5栋403室</p>
							</div>
							<router-link tag="div" class="add-right" to="/address">
								<yd-icon name="compose" color="#1D75D6"></yd-icon>
							</router-link>
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-yellow">默认管理</a>
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
							<div class="add-left">
								<div class="add-header">
									<h1>张三</h1>
									<h2>12345678
										<yd-badge type="danger">默认地址</yd-badge>
									</h2>
								</div>
								<p>安徽省合肥市包河区包河花园5栋403室</p>
							</div>
							<router-link tag="div" class="add-right" to="/address">
								<yd-icon name="compose" color="#1D75D6"></yd-icon>
							</router-link>
						</div>
					</div>
				</li>
					<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-yellow">默认管理</a>
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
							<div class="add-left">
								<div class="add-header">
									<h1>张三</h1>
									<h2>12345678
										<yd-badge type="danger">默认地址</yd-badge>
									</h2>
								</div>
								<p>安徽省合肥市包河区包河花园5栋403室</p>
							</div>
							<router-link tag="div" class="add-right" to="/address">
								<yd-icon name="compose" color="#1D75D6"></yd-icon>
							</router-link>
						</div>
					</div>
				</li>
					<li class="mui-table-view-cell">
					<div class="mui-slider-right mui-disabled">
						<a class="mui-btn mui-btn-yellow">默认管理</a>
						<a class="mui-btn mui-btn-red">删除</a>
					</div>
					<div class="mui-slider-handle">
						<div class="mui-table-cell">
							<div class="add-left">
								<div class="add-header">
									<h1>张三</h1>
									<h2>12345678
										<yd-badge type="danger">默认地址</yd-badge>
									</h2>
								</div>
								<p>安徽省合肥市包河区包河花园5栋403室</p>
							</div>
							<router-link tag="div" class="add-right" to="/address">
								<yd-icon name="compose" color="#1D75D6"></yd-icon>
							</router-link>
						</div>
					</div>
				</li>
		</ul>
		<yd-button-group>
			<yd-button size="large" type="primary" @click.native="userheader">+新增地址</yd-button>
		</yd-button-group>
	</div>
</template>
<script>
	import '../../lib/mui/js/mui.min.js'
	export default {
		data() {
			return {
				chang: "地址管理"
			}
		},
		created() {},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.$parent.$data.showfooter = false
				vm.$parent.$data.showmenu = false
			})
		},
		beforeRouteLeave(to, from, next) {
			this.$parent.$data.showfooter = true
			this.$parent.$data.showmenu = true
			next()
		},
		methods: {
			userheader() {
				this.$router.push({
					name: "address"
				})
			}
		},
		components: {}
	}
</script>
<style scoped>
	.addcontrol-content {
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
</style>

