<template>
  <div class="cards-container">
    <div class="main-card">
      <h2>Place an order</h2>
      <h3>Choose cabin</h3>
      <div class="table">
        <div
          class="row"
          v-for="(cabin, index) in cabins"
          :key="cabin._id"
          @click="chooseCabin"
        >
          <div class="item">Cabin {{ index }} -</div>
          <div class="item">
            {{ cabins[index].address }}
          </div>
          <div class="item">
            ({{ cabins[index].sauna ? "Sauna" : ""
            }}{{ cabins[index].sauna && cabins[index].beach ? ", " : ""
            }}{{ cabins[index].beach ? "Beach" : "" }})
          </div>
        </div>
      </div>
      <h3>Choose service</h3>
      <div class="table">
        <div
          class="row"
          v-for="service in services"
          :key="service.id"
          @click="chooseService"
        >
          <div class="item">
            {{ service.service_name }}
          </div>
        </div>
      </div>
      <h3>Date</h3>
      <input
        type="date"
        id="date"
        value=""
        :min="dateMin"
        @input="currentOrder.date = $event.target.valueAsDate"
      />
      <div class="button" @click="createOrder">Order</div>
    </div>
    <div class="orders-card">
      <h2>Orders</h2>

      <div class="table">
        <div
          class="order row"
          ref="row"
          v-for="order in orders"
          :key="order.id"
        >
          <div class="item date">
            {{ formatDate(order.date) }}
          </div>
          <div class="item name">
            {{ order.service_name }}
          </div>
          <div class="item cabin">
            {{ order.cabin }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue"

export default defineComponent({
  data: function () {
    return {
        cabins: {},
        services: {},
        orders: {},
        currentOrder: { cabin: "", service_name: "", date: null },
        dateMin: ""
    }
  },
  mounted() {
    this.fetchCabins()
    this.fetchServices()
    this.fetchOrders()
    
    const today = new Date().toJSON().slice(0,10)
    this.dateMin = today
  },
  methods: {
    fetchCabins() {
      fetch("http://localhost:5000/cabins/", {"method": "GET",
      headers: {'Authorization': 'Bearer ' + this.$cookies.get("token")},
      })
      .then(async response => {
        const data = await response.json()
        this.cabins = data.cabins
        // console.log(this.cabins)
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchServices() {
      fetch("http://localhost:5000/services/", {"method": "GET"})
      .then(async response => {
        const data = await response.json()
        this.services = data
        // console.log(this.services)
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchOrders() {
      fetch("http://localhost:5000/orders/", {"method": "GET"})
      .then(async response => {
        const data = await response.json()
        this.orders = data
        // console.log(this.orders)
      })
      .catch(err => {
        console.log(err)
      })
    },
    createOrder() {
        if(this.currentOrder.cabin && this.currentOrder.service_name && this.currentOrder.date) {
            if (!(typeof this.currentOrder.date == 'string')) {
                this.currentOrder.date = this.currentOrder.date.toISOString().slice(0, 19).replace('T', ' ')

            }

            fetch("http://localhost:5000/orders/", {"method": "POST",   headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentOrder)
            })
            .then(()=> {
                this.fetchOrders()
            })
          .catch(err => {
            console.log(err)
          })
        }
    },
    chooseCabin(event) {
        const el = event.currentTarget
        this.updateSelections(event)
        
        this.currentOrder.cabin = el.children[1].textContent
    },
    chooseService(event) {
        const el = event.currentTarget
        this.updateSelections(event)
        
        this.currentOrder.service_name = el.children[0].textContent
    },
    updateSelections(event) {
        const options = event.currentTarget.parentElement.children
    
        for (let i = 0; i < options.length; i++) {
            options[i].className = "row inactive"
        }
        event.currentTarget.className = 'row active'

    },
    formatDate(date) {
        date = new Date(date)
        return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth()+1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`
        
    },
  }
})
</script>

<style scoped>
.cards-container {
  margin: auto;
  display: flex;
}
.main-card {
  margin-right: 50px;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px 75px 75px;
}

.orders-card {
  background-color: white;
  width: 500px;
  min-height: 300px;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 30px 75px 75px;
}
.table {
  padding: 5px;
}

.row {
  display: flex;
  justify-content: start;
  padding: 15px;
  font-size: 1.1rem;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 6px;
}
.row:hover {
  background-color: rgba(0, 0, 0, 0.082);
  cursor: pointer;
}

.row.active {
  background-color: rgba(23, 151, 33, 0.822);
  color: white;
}
.item {
  margin-left: 5px;
}

.button {
  padding: 15px;
  background-color: rgb(26, 175, 26);
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  border-radius: 5px;
  margin-top: 15px;
}

.button:hover {
  cursor: pointer;
}

.button:active {
  transform: scale(98.5%);
}

.order:hover {
  cursor: default;
  background-color: inherit;
}

.order {
  padding: 0;
  overflow: hidden;
}

.order .item {
  text-align: start;
  padding: 15px 10px;
  margin: 0;
  height: 100%;
}

.item.date {
  border-right: 1px solid gray;
  width: 18%;
}

.item.name {
  width: 38%;
  border-right: 1px solid gray;
}

.item.cabin {
  width: 44%;
}
</style>