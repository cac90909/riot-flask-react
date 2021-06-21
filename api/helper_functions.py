from riotwatcher import LolWatcher, ApiError
import pandas as pd
import collections
import matplotlib.pyplot as plt
import json

def create_watcher_obj(): #From the riotwater module, creates a wrapper watcher object that can access riot api
    api_key = get_api_key()
    watcher = LolWatcher(api_key)
    return watcher

def get_api_key(): #Called inside of "create_watcher_obj()" and simply reads the riot api key text file
    path = r"C:\Users\Chris\Desktop\Coding_and_data\Projects\Independent_Projects\Riot\riot_api_key.txt"
    api_file = open(path,"r")
    api_key = api_file.read()
    api_file.close()
    return api_key

watcher = create_watcher_obj()

def get_acc_id(region='na1', summoner_name='we and i'): #Called inside of "get_match_list(x,y)"
     
    watcher_summoner = watcher.summoner.by_name(region,summoner_name)
    return watcher_summoner['accountId']

def get_match_list(region='na1', summoner_name="we and i"): #Returns an account's list of matches
    
    acc_id = get_acc_id(region, summoner_name)
    my_matches = watcher.match.matchlist_by_account(region, acc_id)
    return my_matches['matches']

def get_game_id_list(matchlist): #Given a matchlist, returns the game id of every match
    
    game_id_list = []
    for match in matchlist:
        game_id_list.append(match['gameId'])
    return game_id_list

def get_match_detail(game_id, region ='na1'): #Returns the summary details of a match
    
    match_detail = watcher.match.by_id(region, game_id)
    return match_detail

def get_match_timeline(game_id, region='na1'): #Returns a match's timeline object
    
    timeline = watcher.match.timeline_by_match(region, game_id)
    return timeline['frames'] #The other key in the timeline object is 'frameInterval' which I deemed unimportant

def jsonify_info(info):
    
    json_object = json.dumps(info, indent = 4)
    return json_object