<template>
  <kw-layout>
    <kw-header title="通讯录">
      <kw-icon icon="user-add" slot="right"></kw-icon>
    </kw-header>
    <kw-main has-header>
      <div class="search-wrapper">
        <kw-input placeholder="搜索好友" v-model="keySearch" icon="search"></kw-input>
      </div>
     <kw-index-list ref="kwIndexlistRef" :data="groups">
       <kw-index-group v-for="(group, $index) in groups" :divider="group.divider">
         <kw-index-item v-for="(contact, $index) in group.items" @click="viewInformation(contact)">{{contact.username}}</kw-index-item>
       </kw-index-group>
     </kw-index-list>
      <div class="contact-count">
        共{{filterContacts.length}}位联系人
      </div>
    </kw-main>
  </kw-layout>
</template>

<script>
  export default {
    name: 'contacts',
    data () {
      return {
        keySearch: '',
        contacts: [],
        filterContacts: [],
        groups: []
      }
    },
    watch: {
      keySearch (value) {
        this.filterContacts = this.filterData(value)
        this.groups = this.formatData(this.filterContacts)
      }
    },
    methods: {
      findContacts () {
        this.$http.get('/api/user/all').then(response => {
          this.contacts = this.filterContacts = response.data
          this.groups = this.formatData(this.contacts)
        })
      },
      formatData (originData) {
        return this.$refs.kwIndexlistRef.formatData(originData, 'username')
      },
      filterData (keySearch) {
        return this.contacts.filter((contact) => {
          return contact.username.includes(keySearch)
        })
      },
      viewInformation (user) {
        this.$store.dispatch('setTargetUser', user)
        this.$router.push('/information')
      }
    },
    created () {
      this.findContacts()
    }
  }
</script>

<style lang="scss">
  .search-wrapper{
    padding: 10px 5px;
  }
  .contact-count{
    margin-top: 20px;
    text-align: center;
  }
</style>
