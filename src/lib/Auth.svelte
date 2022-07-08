<script>
    let email = '';
    let validEmail = false;
</script>

<div>
    <h1>Auth</h1>
    <p>
        Email
        <input
        type=email 
        bind:value={email}
        >
        <button disabled={validEmail}>Log In</button>
    </p>
</div>
