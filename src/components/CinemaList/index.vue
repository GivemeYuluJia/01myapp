<template>
    <div class="cinema_body" >
      <Loading v-if="isLoading"></Loading>
      <div ref="cinema_body" v-else style="height:100%">
        <ul>
            <li v-for="item in cinemaList" :key="item.cinemaId">
                <div class="cinema_price">
                    <p class="name">{{item.name}}</p>
                    <p class="q"><span class="price">{{ item.lowPrice / 100 }}</span>元起</p>
                </div>
                <div class="cinema_address">
                    <p class="address">{{ item.address }}</p>
                    <p>1763.5km</p>
                </div>
                <div class="card">
                    <div  v-if="item.eTicketFlag==1" class="bl">改签</div>
                    <div  v-if="item.isVisited==0" class="bl">退</div>
                    <div  v-if="item.isVisited==1||item.eTicketFlag==1" class="or">折扣卡</div>
                    <div  v-if="item.isVisited==0||item.eTicketFlag==0" class="or">小吃</div>
                </div>
            </li>
        </ul>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'CinemaList',
  data() {
    return {
      cinemaList: [],
      isLoading: true,
      prevcityId: -1
    }
  },
  props: {
    clist: Array
  },
  created() {
    console.log('111222')
    if (this.clist.length !== 0) {
      this.isLoading = false
      // console.log('fan', this.clist)
      this.cinemaList = this.clist
    }
  },
  activated() {
    var cityId = this.$store.state.city.id
    // console.log('aaa', this.clist)
    if (this.prevCityId === cityId && this.clist.length === 0) { return }
    this.isLoading = true
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=7743423`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16189287264989141385216001","bc":"310100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      const data = res.data.data
      // console.log(res.data.data)
      if (data) {
        this.cinemaList = res.data.data.cinemas
        // console.log('aiaiai', this.cinemaList)
        this.isLoading = false
        this.prevCityId = cityId
        this.GiveDistrict()
        this.$nextTick(() => {
          new BScroll(this.$refs.cinema_body, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    GiveDistrict() {
      this.$emit('mydistrict', this.cinemaList)
    }
  }
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body ul div{margin-bottom: 10px;display: flex;}
.cinema_body .cinema_price,.cinema_address{ justify-content: space-between;}
.cinema_body .cinema_price .name,.cinema_address .address{white-space: nowrap; text-overflow:ellipsis;overflow: hidden;padding-right: 15px;}
.cinema_body .cinema_price p:nth-of-type(2),.cinema_body .cinema_address p:nth-of-type(2){margin-left: 20px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;white-space: nowrap;}
.cinema_body .price{font-size: 18px;}
.cinema_body .cinema_address{font-size: 13px; color:#666;}
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
