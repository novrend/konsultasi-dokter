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
	document.getElementById('list-sp').innerHTML = `<option>Pilih spesialis</option>`
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
    let dokter = document.querySelector(`#list-dokter-${spesialis}`).value
    let waktu = document.getElementById(`list-waktu-dokter-${dokter}`).value
    if (waktu !== 'pilih waktu') {
		let no = jadwal.length+1
		jadwal.push([no,spesialis,dokter,waktu])
		listSp()
    }
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
		document.getElementById('jadwal').innerHTML += `<td id="${i}">${i}</td><td>${schedule[1]}</td><td>${schedule[2]}</td><td>${schedule[3]}</td><td><button onclick="edit(${i})">Edit</button>&nbsp;<button onclick="hapus(${i})">Delete</button></td>`
		i++
	}
}
function change(no) {
	let spesialis = document.querySelector('#list-sp').value
	let dokter = document.querySelector(`#list-dokter-${spesialis}`).value
	let waktu = document.getElementById(`list-waktu-dokter-${dokter}`).value
	if (waktu !== 'pilih waktu') {
		jadwal[no-1] = [no,spesialis,dokter,waktu]
		listSp()
		document.getElementById("submit").value = "Submit"
		document.getElementById("submit").setAttribute( "onClick", `javascript: submit();`);
	}
}
listSp()