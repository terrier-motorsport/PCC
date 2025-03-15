import numpy as np
import csv

x = np.linspace(0, 200*np.pi, 10000) 
y = np.sin(x) 

with open('dummy_data\sin_of_x.csv', 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    # Write the header (optional)
    csv_writer.writerow(['x', 'sin(x)'])
    # Write the data
    for i in range(len(x)):
        csv_writer.writerow([x[i], y[i]])
