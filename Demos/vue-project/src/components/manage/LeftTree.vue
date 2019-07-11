<template>
	<div :class="[classNames + '-container']">
		<div :class="[classNames + '-father'+index]" class="father" v-for="(item,index) in trees">
			<span @click="showChldEvent(index)">{{item.name}}</span>
			<div
				v-if="item.children.length>0&&showControl1[index].show"
				:class="[classNames + '-fchild']"
				v-for="(chi,index2) in item.children"
			>
				<span @click="showsChldEvent(index,index2)">{{chi.name}}</span>
				<div
					v-if="chi.children.length>0&&showControl1[index].childShow[index2].show"
					:class="[classNames + '-schild']"
					v-for="chi2 in chi.children"
				>{{chi2.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
const classNames = 'his-manage-leftree'
const menu = require('./menu.js')
export default {
	name: 'left-tree',
	data() {
		return {
			classNames: classNames,
			trees: menu.default.memu,
			showChild1: false,
			showChild2: false,
			showControl1: [],
			showControl2: [],
			showControl3: [],
			count: 0
		}
	},
	created() {
		this.getControlList(this.trees)
		console.log(this.showControl1)
		// console.log(this.showControl2)
	},
	computed: {},
	methods: {
		showChldEvent(aa) {
			if (this.showControl1[aa] !== '') {
				this.showControl1[aa].show = !this.showControl1[aa].show
			}
		},
		showsChldEvent(aa, bb) {
			if (this.showControl1[aa].childShow[bb].show !== undefined) {
				this.showControl1[aa].childShow[bb].show = !this.showControl1[
					aa
				].childShow[bb].show
			}
		},
		getControlList(arr) {
			let obj = {}
			let newObj = []
			for (let item of arr) {
				if (item.children) {
					obj.show = false
					// this.showControl1.push(obj)
					for (let item1 of item.children) {
						if (item1.children) {
							// obj.childShow = []
							// obj.childShow.push({show:false})
							newObj.push({ show: false })
						} else {
							newObj.push('')
							// obj.childShow.push('')
						}
						obj.childShow = newObj
					}
					this.showControl1.push(obj)
					obj = {}
					newObj = []
				} else {
					this.showControl1.push('')
				}
			}
		}
	}
}
</script>
