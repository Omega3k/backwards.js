module.exports =
  backwards_zip:
    options:
      mode: "gzip"
    expand: true
    cwd   : "src/"
    src   : "**/*"
    dest  : "public/"