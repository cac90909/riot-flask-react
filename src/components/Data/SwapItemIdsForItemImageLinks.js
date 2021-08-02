function SwapItemIdsForItemImageLink(item_list){

    const item_image_links = []

    for (var item of item_list){
        let item_image_link = `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${item}.png`
        item_image_links.push(item_image_link)
    }

    return item_image_links

}

export {SwapItemIdsForItemImageLink}