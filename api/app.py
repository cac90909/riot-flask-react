from flask import Flask
import data_struc_functions as dsf

app = Flask(__name__)

@app.route('/TEST', methods = ['GET'])
def api():
    return dsf.get_relev_info_TEST()