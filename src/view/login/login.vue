<template>
	<div class="container">
		<div class="main">
			<transition enter-active-class="fadeInRight" leave-active-class="zoomOutRight">
				<div v-show="show" class="content animated">
					<div class="title">后台管理系统</div>
					<Form ref="formInline" :model="formInline" :rules="ruleInline">
						<FormItem prop="user">
							<Input type="text" v-model="formInline.user" placeholder="用户名">
							<Icon type="ios-person-outline" slot="prepend"></Icon>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="formInline.password" placeholder="密码">
							<Icon type="ios-locked-outline" slot="prepend"></Icon>
							</Input>
						</FormItem>
						<FormItem>
							<Button type="primary" long @click="handleSubmit('formInline')">
				            	 <span v-if="!loading">登录</span>
	        						<span v-else>登录中</span>
				            </Button>
						</FormItem>
					</Form>
				</div>
			</transition>
		</div>
		<div class="bg" >
				<img src="https://raw.githubusercontent.com/TTT822520/hm-iview-admin/master/src/assets/img/bg.jpg"  style="height: 100%; width:100%"/>
				<particle style="position: absolute;top:0;" bgcolor="none"></particle>
		</div>
	</div>
</template>

<script>
    import util from '../../assets//js/util'
	import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
	import particle from '../../components/particle.vue'
	export default {
		data() {
			return {
				show: false,
				loading: false,
				formInline: {
					user: 'test',
					password: 'tab822520'
				},
				ruleInline: {
					user: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请填写密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密码长度不能小于6位',
							trigger: 'blur'
						}
					]
				}
			}
		},
		computed:{
			...mapState([
				'login'
			])
		},
		methods: {
			 ...mapMutations([
                'FETCH_LOGIN_STATUS'
            ]),
			handleSubmit(name) {
				
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.loading = true;
						var username = this.formInline.user;
                        var password = this.formInline.password;
                        setTimeout( () => {
							if( this.formInline.user == 'test' && this.formInline.password  == 'tab822520') {
                                util.setLocalStorage('token',Math.random()*10000000)
								this.$Message.success('登录成功!');
								setTimeout(() => {
									this.$router.push('home');
									this.loading = false;
								})
							}else{
								this.$Message.error("登录失败");
								setTimeout(() => {
									this.loading = false;
								}, 200)
							}
						},500)
						// this.$store.dispatch('fetchACtionLogin',{
						// 	name:username,
						// 	password: password
						// })
						// setTimeout( () => {
						// 	if(this.login.data.success) {
						// 		this.$Message.success('登录成功!');
						// 		setTimeout(() => {
						// 			this.$router.next({path:'Info'});
						// 			this.loading = false;
						// 		})
						// 	}else{
						// 		this.$Message.error(this.login.data.logMsg);
						// 		setTimeout(() => {
						// 			this.loading = false;
						// 		}, 200)
						// 	}
						// },500)
						
					} else {
						this.$Message.error('登录失败!');
					}
				})
			},
			showList() {
				this.show = !this.show;
			},
			getStates() {
				var status = this.login.data.success;
				if(status) {
					this.$router.next({
                      path:'/Info'
                    })
				}
			}
		},
		components:{
			particle
		},
		mounted() {
			this.showList();
			// this.getStates();
		}
	}
</script>

<style>
	.title {
		width: 100%;
		height: 35px;
		text-align: center;
		line-height: 35px;
		font-size: 18px;
		margin-bottom: 25px;
	}
	.container {
		position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0px;
	    bottom: 0px;
		overflow: hidden;
	}
	.main {
		    top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translateY(-50%);
		margin: auto;
		color: #000;
		position: fixed;
		-ms-flex-line-pack: center;
		align-content: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		z-index: 2;
	}
	.bg {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		/*background: url(../../assets/img/bg.jpg) no-repeat;*/
		height: 100%;
		/* filter: blur(2px); */
		z-index: 1;
	}
	.content {
		width: 420px;
		padding: 40px;
		background: #fff;
		border: 1px solid #e4e1e1;
		border-radius: 5px;
		margin: 250px auto;
		box-shadow: 0px 2px 2px #e4e1e1;
		z-index: 2;
	}
</style>