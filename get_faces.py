#! /usr/bin/python

import cv2
import argparse
import sys
import os
import glob
import random

def get_faces(video, save_faces=True, save_non=False, pscale=1.3, pneighbors=8, pos='positive2', nscale=1.1, nneighbors=2, neg='negative2', debug=False):

    cascade_sz = 24
    name = os.path.basename(video).split(".")[0]
    src = os.path.dirname(video)

    # clear old saved faces
    if save_faces:
        for f in glob.glob(os.path.join(pos, name) + '*'):
            os.remove(f)
    if save_non:
        for f in glob.glob(os.path.join(neg, name) + '*'):
            os.remove(f)


    vid = cv2.VideoCapture(video)
    face_cascade = cv2.CascadeClassifier('/usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_alt2.xml')

    frame_count = 0;
    face_count = 0;
    non_count = 0;

    success, image = vid.read()
    height, width, _ = image.shape

    while success:

        grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(grey, pscale, pneighbors)

        if save_faces:
            for (x, y, w, h) in faces:
                cv2.imwrite(os.path.join(pos, name + "_face_%d.jpg" % face_count), grey[y:(y+h), x:(x+w)])
                face_count +=1

        if save_non and len(faces):
            sz = random.randint(cascade_sz, min(height-cascade_sz, width-cascade_sz)-1)
            x = random.randint(0, width-sz-1)
            y = random.randint(0, height-sz-1)

            roi = image[y:(y+sz), x:(x+sz)]
            roi_grey = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

            if not len(face_cascade.detectMultiScale(roi_grey, nscale, nneighbors)):
                cv2.imwrite(os.path.join(neg, name + "_non_%d.jpg" % non_count), roi_grey)
                non_count +=1

        if debug:
            sys.stdout.write("\r%s frame=%d face=%d non=%d" % (name, frame_count, face_count, non_count))
            sys.stdout.flush()

        frame_count += 1
        success, image = vid.read()

    if debug:
        print


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=str)
    args = parser.parse_args()

    get_faces(video=args.video, save_faces=True, save_non=True, debug=True)
