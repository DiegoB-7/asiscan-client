<script  context="module" lang="ts">

export function generatePassword() {
        var length = 18,
            charset = "!@#$abc!@#defghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456/!@$789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
}


</script>