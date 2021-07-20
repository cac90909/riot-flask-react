function SwapSSIdForName({ss_data}, ss){


    var ss_names = []

    for (var summoner_spell in ss_data){
        var ss_obj = ss_data[summoner_spell]
        var ss_key_num = parseInt(ss_obj.key)
        if (ss_key_num == ss[0] || ss_key_num == ss[1]){
            ss_names.push(ss_obj.name)
        }
    }


    return ss_names

}

export { SwapSSIdForName }