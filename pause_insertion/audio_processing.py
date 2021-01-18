import numpy as np
import glob
from pydub import AudioSegment
import matplotlib.pyplot as plt
import pygal



mysp=__import__("my-voice-analysis")

label_list = []
silence_duration_list = []
sound_duration_list = []

tlt_syllables =0
tlt_duration = 0

s_t_list = []
e_t_list = []

##### Calculate average pause duration and pause labels
with open('Label Track.txt','r') as f:
    for str_line in f:
        start_t = float(str_line.split("\t")[0])
        end_t = float(str_line.split("\t")[1])
        s_t_list.append(start_t)
        e_t_list.append(end_t)
        sound_duration_list.append([start_t,end_t])
        tlt_duration+=(end_t-start_t)
        # print(num)
        # silence_label_list.append(num)

print(tlt_duration)
silence_duration_list = np.array(s_t_list[1:len(s_t_list)])-np.array(e_t_list[0:-1])
silence_label_list = s_t_list[1:len(s_t_list)]
silence_label_list.append(e_t_list[-1])

print(len(sound_duration_list))
print(len(silence_duration_list))
print(len(silence_label_list))
print("avg silence duration: " + str(np.average(silence_duration_list)) + " s")

## Prceprocess all the audio segs by adding 3 sec pause to each segment
file_count = 0
for fname in glob.glob("audio segs" + '/*.wav'):
    # print(fname.split('\\')[1])
    audio_in_file = fname
    audio_out_file = "audio segs extended/" + fname.split('\\')[1]
    one_sec_segment = AudioSegment.silent(duration=3000)  # duration in milliseconds
    # read wav file to an audio segment
    song = AudioSegment.from_wav(audio_in_file)
    # Add above two audio segments
    final_song = one_sec_segment + song
    final_song.export(audio_out_file, format="wav")
    file_count += 1

###### Calculate the syllable rate for each audio segments
sylb_rate_list = []
last_sylb_rate = 0
sylb_rate = 0
print(file_count)
for i in range(file_count):
    p = str(i+1)  # Audio File title
    c = r"C:\Users\Owner\Desktop\Online video player\video player design\pause_insertion\audio segs extended"  # Path to the Audio_File directory (Python 3.7)
    num_sylb = mysp.myspsyl(p, c)
    audio_dur = mysp.myspst(p, c)
    if audio_dur!=0:
        sylb_rate = num_sylb / audio_dur
        sylb_rate_list.append(sylb_rate)
        print(str(i + 1) + ".wav : " + str(sylb_rate) + " sylbs/sec")
    else:
        # sylb_rate_list.append(last_sylb_rate)
        num_sylb=0
        sylb_rate_list.append(0)
        print(str(i+1)+".wav" + "file not clear. Set syllable rate to 0")

    last_sylb_rate = sylb_rate
    tlt_syllables += num_sylb

print(sylb_rate_list)
print("avg sylb rate: " + str(np.average(np.array(sylb_rate_list))))

##### Visualize the sylb rate
avg_sylb_rate = np.average(sylb_rate_list)
vid_length = 120+30
plt.xlim(0, vid_length)
plt.ylim(0, 8)

for i in range(len(sound_duration_list)):
    sylb_rate = sylb_rate_list[i]
    x_vals = sound_duration_list[i]
    y_vals = [sylb_rate,sylb_rate]
    plt.plot(x_vals,y_vals,color = 'blue',linewidth = 5)

plt.plot([0,vid_length],[avg_sylb_rate,avg_sylb_rate],'--',color = 'red',linewidth = 1,label = 'Average syllable rate')
plt.xlabel('Video time (sec)', fontsize=18)
plt.ylabel('Syllable rate (# of syllables/sec)', fontsize=16)
plt.savefig("syllable rate.svg", dpi=200)
plt.legend()
plt.show()

#### Generate a final pause array to be used in the VSC code
final_silence_label_list = []
seg_duration_list = []
for i in range(len(sylb_rate_list)):
    if sylb_rate_list[i] >= avg_sylb_rate:
        final_silence_label_list.append(silence_label_list[i])
        seg_duration_list.append(round(sound_duration_list[i][1]-sound_duration_list[i][0],2))

print(final_silence_label_list)

with open('Silence Labels.txt','w') as f:
    f.write(str(final_silence_label_list))

print(seg_duration_list)
with open('Sound duration.txt','w') as f:
    f.write(str(seg_duration_list))

