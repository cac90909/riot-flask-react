import data_struc_functions as dsf

if __name__ == "__main__":

    match_list = dsf.helper_functions.get_match_list()
    g_id = dsf.helper_functions.get_game_id_list(match_list)[0]

    time = dsf.helper_functions.get_match_timeline(g_id)
    match_det = dsf.helper_functions.get_match_detail(g_id)

    data_struc = dsf.get_relev_info(time, match_det)
    data_struc_json = dsf.helper_functions.jsonify_info(data_struc)

    print(data_struc_json)
   