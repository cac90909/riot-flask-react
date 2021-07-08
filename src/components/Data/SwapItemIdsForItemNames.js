function SwapItemIdsForItemNames({item_data}, item_list){

    const item_names = []

    for (var item of item_list){
        let item_name = item_data[item].name
        item_names.push(item_name)
    }

    return item_names

}

export {SwapItemIdsForItemNames}