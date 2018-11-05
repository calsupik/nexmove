<template>
  <div class="login">
    <h1>Welcome to NexMove</h1>
    <form action="auth/createuser" method="post">
      <input type="email" placeholder="Enter Email" name="username" required=true>
      <input type="password" placeholder="Enter Password" name="password" required=true>
      <input type="password" placeholder="Confirm Password" name="cpassword" required=true>
      <button type="submit">Submit</button>
    </form>

    <form action="auth/local" method="post">
      <input type="email" placeholder="Enter Email" name="username" required=true>
      <input type="password" placeholder="Enter Password" name="password" required=true>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    createUser(){}
  },
  async mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
