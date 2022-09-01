#!/usr/bin/bash
for files in valid-numbers-to-check/*.txt
do
  total_unregistered=$(cat $files | grep "UNREGISTERED" | wc -l) 
  total_invite=$(cat $files | wc -l)
  let total_registered=$total_invite-$total_unregistered
  echo "$files" >> results/results.txt
  echo "    "  >> results/results.txt
  echo "* Total Invite ${total_invite}" >> results/results.txt
  echo "* Unregistered ${total_unregistered}" >> results/results.txt
  echo "* Registered ${total_registered}" >> results/results.txt
  echo "----" >> results/results.txt
  echo "    "  >> results/results.txt
done

echo "Check the Results in the results.txt file"
