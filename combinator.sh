#!/usr/bin/env sh

#example of imagemagick cryptographic command line api
convert tmp/quote.png -alpha set -background white \( tmp/out.gif -coalesce \) \
-set page "%[fx:u.w]x%[fx:u.h+v.h]+%[fx:t?(u.w-v.w)/2:0]+%[fx:t?u.h:0]" -coalesce \
null: -insert 1 -layers composite -bordercolor white -border 30 -loop 0 tmp/result.gif

#convert gif to mp4 because size
ffmpeg -loglevel panic -y -i tmp/result.gif -movflags faststart -pix_fmt yuv420p \
-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" tmp/result.mp4