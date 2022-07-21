let jadwal = []
function getJadwal(input) {
    let result = []
    for (let key of input) {
        let start = +key.start.split('.00')[0]
        let finish = key.finish.split('.00')[0]
        for (let i = start; i < finish; i++) {
            if (i < 10) {
                jam = `0${i}`
            } else {
                jam = i
            }
            if (i+1 < 10) {
                jam2 = `0${i}`
            } else {
                jam2 = i+1
            }
            result.push(`${key.hari} ${jam}.00 - ${jam2}.00`)
        }
    }
    return result
}
function listSp() {
	document.getElementById('list-sp').innerHTML = `<option on>Pilih spesialis</option>`
	document.getElementById('show').innerHTML = ''
	document.getElementById('jam').innerHTML = ''
	for (let key in obj) {
		document.getElementById('list-sp').innerHTML += `<option value="${key}">${key}</option>`
		document.getElementById('show').innerHTML += 
		`<div id="list-${key}" style="display:none;">
			<select id="list-dokter-${key}" onchange="showHideWaktu(this)">
				<option id="default">pilih dokter</option>
			</select>
		</div>`
		for (let keys of obj[key]) {
			document.getElementById(`list-dokter-${key}`).innerHTML += `<option value="${keys.nama}">${keys.nama}</option>`
			document.getElementById('jam').innerHTML += 
			`<div id="list-waktu-${keys.nama}" style="display:none;">
				<select id="list-waktu-dokter-${keys.nama}">
					<option>pilih waktu</option>
				</select>
			</div>`
			let schedule = getJadwal(keys.jadwal)
			for (let waktu of schedule) {
				let status = false
				if (!jadwal.length) {
					jadwal = [[0,0,0]]
					status = true
				}
				let duplicate = false
				for (let check of jadwal) {
					if (check[2] == keys.nama && waktu == check[3]) {
						duplicate = true
						break
					}
				}
				if (!duplicate) {
					document.getElementById(`list-waktu-dokter-${keys.nama}`).innerHTML += `<option value="${waktu}">${waktu}</option>`
				}
				if (status) {
					jadwal = []
				}
			}
		}
	}
	showJadwal()
}
function showHideInput(sel) {
    let value = sel.value
    for (let key in obj) {
        if (key === value) {
        	document.getElementById(`list-${key}`).style.display = 'block';
        } else {
    		document.getElementById(`list-${key}`).style.display = 'none';
        }
	}
	for (let key in obj) {
		for (let keys of obj[key]) {
	    	document.getElementById(`list-waktu-${keys.nama}`).style.display = 'none';
	    }
	}
	document.getElementById("default").selected = true;
}
function showHideWaktu(sel) {
	let value = sel.value
	for (let key in obj) {
		for (let keys of obj[key]) {
			if (keys.nama === value) {
	        	document.getElementById(`list-waktu-${value}`).style.display = 'block';
	        } else {
	    		document.getElementById(`list-waktu-${keys.nama}`).style.display = 'none';
	        }
	    }
	}
}
function submit() {
	let spesialis = document.querySelector('#list-sp').value
	let dokter,waktu
	for (let key in obj) {
        if (key === spesialis) {
        	dokter = document.querySelector(`#list-dokter-${key}`).value
        	waktu = document.getElementById(`list-waktu-dokter-${dokter}`).value
        	break
        }
	}
	let no = jadwal.length+1
	jadwal.push([no,spesialis,dokter,waktu])
	listSp()
}
function edit(no) {
	document.getElementById("submit").value = "Edit"
	document.getElementById("submit").setAttribute( "onClick", `javascript: change(${no});`);
}
function hapus(no) {
	document.getElementById(no).remove()
	jadwal.splice(no-1, 1)
	listSp()
}
function showJadwal() {
	document.getElementById('jadwal').innerHTML = `<thead><tr>
			<th>No</th>
			<th>Spesialis</th>
			<th>Dokter</th>
			<th>Waktu</th>
			<th>Action</th>
		</tr></thead>`
	let i = 1
	for (schedule of jadwal) {
		schedule[0] = i
		document.getElementById('jadwal').innerHTML += `<td id="${i}">${i}</td><td>${schedule[1]}</td><td>${schedule[2]}</td><td>${schedule[3]}</td><td><button onclick="edit(${i})">Edit</button><button onclick="hapus(${i})">Delete</button></td>`
		i++
	}
}
function change(no) {
	let spesialis = document.querySelector('#list-sp').value
	let dokter = document.querySelector(`#list-dokter-${spesialis}`).value
	let waktu = document.getElementById(`list-waktu-dokter-${dokter}`).value
	jadwal[no-1] = [no,spesialis,dokter,waktu]
	listSp()
}
let obj = {
	Akupuntur: [
		{
			nama: 'dr. Agoeng Prayitno',
			jadwal: [
				{
					hari: 'Selasa',
					start: '09.00',
					finish: '12.00'
				},
				{
					hari: 'Jumat',
					start: '11.00',
					finish: '12.00'
				}
			]
		},
		{
			nama: 'dr. Sherry Hendrika',
			jadwal: [
				{
					hari: 'Rabu',
					start: '09.00',
					finish: '12.00'
				},
				{
					hari: 'Sabtu',
					start: '09.00',
					finish: '12.00'
				}
			]
		}
	],
	Anestesi: [
		{
			nama: 'dr. Agus Jaya Nugraha, Sp. An',
			jadwal: [
				{
					hari: 'Rabu',
					start: '09.00',
					finish: '11.00'
				},
				{
					hari: 'Kamis',
					start: '09.00',
					finish: '11.00'
				}
			]
		},
		{
			nama: 'dr. Desy Januarrifianto, Sp. An',
			jadwal: [
				{
					hari: 'Senin',
					start: '13.00',
					finish: '14.00'
				},
				{
					hari: 'Selasa',
					start: '09.00',
					finish: '11.00'
				}
			]
		}
	],
	Anak: [
	    {
	        nama: 'dr. Desiana, Sp.A  ',
	        jadwal: [
	            {
	                hari: 'Senin',
	                start: '09.00',
	                finish: '11.00'
	            },
	            {
	                hari: 'Rabu',
	                start: '09.00',
	                finish: '11.00'
	            },
	            {
	                hari: 'Jumat',
	                start: '09.00',
	                finish: '11.00'
	            },
	            {
	                hari: 'Sabtu',
	                start: '08.00',
	                finish: '09.00'
	            }
	        ]
	    },
	    {
	        nama: 'dr. Fahmi Hasan, Sp. A ',
	        jadwal: [
	            {
	                hari: 'Selasa',
	                start: '09.00',
	                finish: '12.00'
	            },
	            {
	                hari: 'Rabu',
	                start: '16.00',
	                finish: '18.00'
	            },
	            {
	                hari: 'Sabtu',
	                start: '16.00',
	                finish: '18.00'
	            }
	        ]
	    },
	    {
	        nama: 'dr. Fita Asfianti, Sp.A, M.Kes.',
	        jadwal: [
	            {
	                hari: 'Senin',
	                start: '08.00',
	                finish: '09.00'
	            },
	            {
	                hari: 'Selasa',
	                start: '16.00',
	                finish: '18.00'
	            },
	            {
	                hari: 'Rabu',
	                start: '08.00',
	                finish: '09.00'
	            },
	            {
	                hari: 'Kamis',
	                start: '16.00',
	                finish: '18.00'
	            },
	            {
	                hari: 'Jumat',
	                start: '08.00',
	                finish: '10.00'
	            }
	        ]
	    },
	    {
	        nama: 'dr. Opy Dyah Paramita, MSi.Med, Sp.A., MPH.',
	        jadwal: [
	            {
	                hari: 'Ssabtu',
	                start: '13.00',
	                finish: '15.00'
	            }
	        ]
	    }
	],
	Gizi: [
        {
            nama: 'dr. Fani Safitri, Sp.GK',
            jadwal: [
                {
                    hari: 'Selasa',
                    start: '15.00',
                    finish: '17.00'
                },
                {
                    hari: 'Kamis',
                    start: '15.00',
                    finish: '17.00'
                },
                {
                    hari: 'Sabtu',
                    start: '10.00',
                    finish: '12.00'
                }
            ]
        },
        {
            nama: 'dr. M. Arifin Suyardi, Sp. Gz ',
            jadwal: [
                {
                    hari: 'Senin',
                    start: '08.00',
                    finish: '12.00'
                },
                {
                    hari: 'Selasa',
                    start: '08.00',
                    finish: '10.00'
                },
                {
                    hari: 'Rabu',
                    start: '10.00',
                    finish: '14.00'
                },
                {
                    hari: 'Kamis',
                    start: '10.00',
                    finish: '14.00'
                },
                {
                    hari: 'Jumat',
                    start: '08.00',
                    finish: '12.00'
                }
            ]
        }
    ],
    Jiwa: [
        {
            nama: 'dr. Agung Frijanto, Sp. KJ ',
            jadwal: [
                {
                    hari: 'Rabu',
                    start: '15.00',
                    finish: '17.00'
                },
                {
                    hari: 'Jumat',
                    start: '15.00',
                    finish: '17.00'
                }
            ]
        },
        {
            nama: 'dr. Ira Savitri, Sp. KJ ',
            jadwal: [
                {
                    hari: 'Selasa',
                    start: '15.00',
                    finish: '17.00'
                },
                {
                    hari: 'Kamis',
                    start: '15.00',
                    finish: '17.00'
                }, 
                {
                    hari: 'Sabtu',
                    start: '09.00',
                    finish: '12.00'
                }
                
            ]
        },
        {
            nama: 'dr. Metta Desvini PS, Sp. KJ  ',
            jadwal: [
                {
                    hari: 'Senin',
                    start: '09.00',
                    finish: '10.00'
                },
                {
                    hari: 'Rabu',
                    start: '10.00',
                    finish: '12.00'
                }, 
                {
                    hari: 'Jumat',
                    start: '10.00',
                    finish: '12.00'
                }
                
            ]
        },
        {
            nama: 'dr. Rusdi Effendi, Sp. KJ ',
            jadwal: [
                {
                    hari: 'Sabtu',
                    start: '10.00',
                    finish: '12.00'
                }
                
            ]
        }
    ]
}
listSp()