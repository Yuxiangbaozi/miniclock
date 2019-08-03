Component({
  data: {
    value: ""
  },
  properties: {
    placeholder: {
      type: String,
      value: "",
    },
    visible: {
      type: Boolean,
      value: false,
    }
  },
  methods: {
    sure(){
      this.triggerEvent('sure', this.data.value)
    },
    cancel(){
      this.triggerEvent('cancel')
    },
    watchValue(event){
      this.data.value = event.detail.value
    }
  }
})