function SwapChampIdForChampName({champ_data}, champ_id){

    for(var champ_name in champ_data){
        if (champ_data[champ_name].key == champ_id) {
            return champ_name
        }
    }
}

export {SwapChampIdForChampName}