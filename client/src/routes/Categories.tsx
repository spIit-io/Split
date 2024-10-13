import { PieChart } from '@mui/x-charts/PieChart';

function Categories() {
	return (
        <>
        <div>
            <div className=" text-2xl text-[#222] p-20 text-center mb-10">Debts Summary</div>
        </div>
		<div className="justify-center items-center">
			<PieChart
			series={[
				{
				data: [
					{ id: 0, value: 10, label: 'Misc' },
					{ id: 1, value: 15, label: 'Clothes' },
					{ id: 2, value: 20, label: 'Food' },
					{ id: 3, value: 20, label: 'Life' },
				],
                innerRadius: '30%',
                outerRadius: '100%',
                paddingAngle: 5,
                cornerRadius: 5,
				},
			]}
			width={1000}
			height={500}
			/>
		</div>
        </>
	)

}

export default Categories