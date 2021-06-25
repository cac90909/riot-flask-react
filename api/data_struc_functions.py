import helper_functions
import sys
import collections

def get_relev_timeline_info(timeline): #Called inside of 'get_relev_info(x,y)'
    
    a_dict = collections.defaultdict(list)
    
    for frame in timeline:
        temp_list = []
        for participant in frame['participantFrames']:
            relev_keys = ['participantId', 'position', 'currentGold', 
                          'totalGold', 'level', 'xp', 'minionsKilled', 'jungleMinionsKilled']
            
            temp_dict = {x: frame['participantFrames'][participant][x] for x in relev_keys if x in frame['participantFrames'][participant]}
            #packaged_temp_dict = {participant:temp_dict} --> indefinetly removed because creates overcomplexity on the react side of data unpackaging
            temp_list.append(temp_dict)
        a_dict[frame['timestamp']] = temp_list
       
    return a_dict

def get_relev_event_info(timeline): #Called inside of 'get_relev_info(x,y)'
    
    #a_dict = collections.defaultdict(list) --> changed to be a list. Doesn't make much sense to have a dictionary where the keys are essentially list indices
    a_list = []
    for frame in timeline:
        for event in frame['events']:
            a_list.append(event)
            
    return a_list
           
def get_relev_summary_info(match_detail): #Called inside of 'get_relev_info(x,y)'
    
    a_dict = collections.defaultdict(list)
    
    game_keys = ['gameId', 'platformId', 'gameDuration', 'queueId', 'mapId', 
                 'seasonId', 'gameVersion', 'gameMode', 'gameType']
    team_keys = ['teams']
    player_keys = ['participants', 'participantIdentities']
    
    temp_game_dict = {x: match_detail[x] for x in game_keys if x in match_detail }
    temp_team_dict = {x: match_detail[x] for x in team_keys if x in match_detail }
    temp_player_dict = {x: match_detail[x] for x in player_keys if x in match_detail }
    
    a_dict['Game'] = temp_game_dict
    a_dict['Team'] = temp_team_dict
    a_dict['Player'] = temp_player_dict
    
    return a_dict

def get_relev_info(timeline, match_detail):
    
    a_dict = collections.defaultdict(list)
    
    timeline_dict = get_relev_timeline_info(timeline)
    event_dict = get_relev_event_info(timeline)
    summary_dict = get_relev_summary_info(match_detail)
    
    a_dict['Timestamps'] = timeline_dict
    a_dict['Events'] = event_dict
    a_dict['Summary'] = summary_dict
    
    return a_dict

def get_relev_info_TEST():
    match_list = helper_functions.get_match_list()
    g_id = helper_functions.get_game_id_list(match_list)[0]

    time = helper_functions.get_match_timeline(g_id)
    match_det = helper_functions.get_match_detail(g_id)

    data_struc = get_relev_info(time, match_det)
    data_struc_json = helper_functions.jsonify_info(data_struc)

    return data_struc