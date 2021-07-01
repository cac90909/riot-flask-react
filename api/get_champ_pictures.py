import json
import requests


def get_champ_pictures(version):
    champ_json_info_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json'
    response = requests.get(champ_json_info_url).text
    response_info = json.loads(response)

    champs_list = list(response_info['data'].keys())

    import urllib.request

    for champ_name in champs_list[:]:
        champ_pic_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champ_name}.png'
        save_path = f'C:\\Users\\Chris\\Desktop\\Coding_and_data\\Projects\\Independent_Projects\\jupyter notebooks for riot project\\Assets\\{champ_name}.png'
        urllib.request.urlretrieve(champ_pic_url, save_path)