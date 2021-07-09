function GetSpecialItemCases(){

    var intact_stopwatch_id = 2420
    var broken_stopwatch_id = 2421
    
    var spellthiefs_edge_id = 3850
    var frostfang_id = 3851 //currently not tracked in Riot's event data
    var shard_ice_id = 3853

    var spectrals_sickle_id = 3862
    var harrowing_crescent_id = 3863 //currently not tracked in Riot's event data
    var black_scythe_id = 3864

    var shoulderguards_id = 3854
    var spaulders_id = 3855 //currently not tracked in Riot's event data
    var pauldrons_id = 3857

    var relic_shield_id = 3858
    var targons_id = 3859 //currently not tracked in Riot's event data
    var bulwark_id = 3860

    var special_cases = [intact_stopwatch_id, spellthiefs_edge_id, frostfang_id, spectrals_sickle_id, harrowing_crescent_id
                        , shoulderguards_id, spaulders_id, relic_shield_id, targons_id ]

    var special_cases_mapping = {
        2420 : broken_stopwatch_id,
        3850 : shard_ice_id,
        3862: black_scythe_id,
        3854 : pauldrons_id,
        3858 : bulwark_id
    }

    return [special_cases, special_cases_mapping]

}

export {GetSpecialItemCases}