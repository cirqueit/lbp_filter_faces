import glob
import os
import argparse
from get_faces import get_faces

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("src", type=str)
    args = parser.parse_args()

    for f in glob.glob(os.path.join(args.src, "*.mp4")):
        get_faces(video=f, debug=True)
