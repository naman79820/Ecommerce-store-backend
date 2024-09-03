const toSlug=(str)=>{

    return str
    .toLowerCase()
    .toReplace(/[\s_]+/g,'-')
    .toReplace(/[^\w-]+/g,'')
}

module.exports = {toSlug}