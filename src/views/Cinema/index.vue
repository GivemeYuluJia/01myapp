<template>
  <div id="main" ref="main">
    <Header title="Y颜影院"></Header>
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch" @click="AllCity=!AllCity">
          {{qu}} <i class="iconfont icondown"></i>
        </div>
        <div class="brand_switch">
          品牌 <i class="iconfont icondown"></i>
        </div>
        <div class="feature_switch">
          特色 <i class="iconfont icondown"></i>
        </div>
      </div>
      <cinema-List @mydistrict="formatDistrictList" :key="timer" :clist="cinema"></cinema-List>
      <div class="selection_box" v-show="AllCity" >
        <div class="cineam_selection">
          <ul>
            <li class="selection" v-for="item in districtList" :key="item.index">
              <div class="noselected" @click="handleScreen(item.index, item.list)" :class="{selected:item.index == qu}">{{item.index}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import cinemaList from '@/components/CinemaList'
export default {
  name: 'Cinema',
  data() {
    return {
      AllCity: false,
      districtList: [],
      current: 0,
      cinema: [],
      qu: '全城',
      timer: ''
    }
  },
  components: {
    Header,
    cinemaList
  },
  activated() {
    this.qu = '全城'
  },
  mounted() {
    this.$refs.main.style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    formatDistrictList(ev) {
      // console.log('收到数据aaaa', ev)
      var districtSet = new Set()
      districtSet.add('全城')
      var districtList = []
      var district = ev
      if (district) {
        for (var i = 0; i < district.length; i++) {
          districtSet.add(district[i].districtName)
        }
        var districtArr = Array.from(districtSet)
        for (var j = 0; j < districtArr.length; j++) {
          const arr = district.filter(item => item.districtName === districtArr[j])
          if (!arr.length) {
            districtList.push({
              index: districtArr[j],
              list: district
            })
          } else {
            districtList.push({
              index: districtArr[j],
              list: arr
            })
          }
        }
      }
      this.districtList = districtList
    },
    handleScreen(index, list) {
      // console.log('1231', Ilist)
      this.qu = index
      this.cinema = list
      this.AllCity = !this.AllCity
      this.timer = new Date().getTime()
    }
  }
}
</script>
<style scoped>
#content .selection_box{width: 100%;height: 100%; position: fixed;top: 97px;left: 0; background: rgba(0,0,0,0.4);z-index: 2;}
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; background:white;}
#content .cinema_menu .city_switch, .brand_switch, .feature_switch{flex: 1;line-height: 45px;text-align: center;}
#content .cineam_selection{width: 100%;position: fixed;top: 97px;background: #fff;}
#content .cineam_selection ul{padding-top: 10px;margin-left: 10px;display: flex;flex-wrap: wrap;}
#content .cineam_selection ul .selection{font-size: 12px;width: 81px;padding-bottom: 15px;padding-right: 10px;height: 30px;}
#content .cineam_selection ul .noselected{position: relative; color: #797d82;border-radius: 3px;text-align: center;height: 30px;line-height: 27px;border: 1px solid rgba(210,214,220,.5);}
#content .cineam_selection ul li .selected{color: #ff5f16;border: 1px solid #ff5f16;}
</style>
