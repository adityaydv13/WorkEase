const Hire = require('../models/hire');
const Worker = require('../models/worker');

// exports.respondToHireRequest = async (req, res) => {
//     const { id } = req.params; // hire request ID
//     const { status } = req.body; // 'accepted' or 'rejected'

//     if (!['accepted', 'rejected'].includes(status)) {
//         return res.status(400).json({ message: 'Invalid status. Use accepted/rejected.' });
//     }

//     try {
//         const hire = await Hire.findById(id);
//         if (!hire) {
//             return res.status(404).json({ message: 'Hire request not found' });
//         }

//         if (hire.status !== 'pending') {
//             return res.status(400).json({ message: 'Request already responded to.' });
//         }

//         hire.status = status;
//         await hire.save();

//         // If accepted, update the worker's status
//         if (status === 'accepted') {
//             const worker = await Worker.findById(hire.workerId);
//             worker.status = 'hired';
//             // worker.userId = hire.userId;
//             await worker.save();
//         }

//         res.status(200).json({ message: `Request ${status}`, hire });
//     } catch (err) {
//         console.error('Error responding to hire request:', err);
//         res.status(500).json({ message: 'Error updating request', error: err.message });
//     }
// };
exports.respondToHireRequest = async (req, res) => {
    const { id } = req.params; // hire request ID
    const { status } = req.body; // 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Use accepted/rejected.' });
    }

    try {
        const hire = await Hire.findById(id);
        if (!hire) {
            return res.status(404).json({ message: 'Hire request not found' });
        }

        if (hire.status !== 'pending') {
            return res.status(400).json({ message: 'Request already responded to.' });
        }

        if (status === 'accepted') {
            hire.status = 'accepted';
            await hire.save();

            const worker = await Worker.findById(hire.workerId);
            worker.status = 'hired';
            await worker.save();

            return res.status(200).json({ message: 'Request accepted', hire });
        }

        // If rejected, delete the request
        await Hire.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Request rejected and deleted' });

    } catch (err) {
        console.error('Error responding to hire request:', err);
        res.status(500).json({ message: 'Error updating request', error: err.message });
    }
};



exports.getRequestsForWorker = async (req, res) => {
  try {
    const requests = await Hire.find({
      workerId: req.params.workerId,
      status: 'pending',
    }).populate('userId', 'name location');

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getRequestsForWorker = async (req, res) => {
//   try {
//     // Fetch both pending and accepted requests
//     const requests = await Hire.find({
//       workerId: req.params.workerId,
//       status: { $in: ['pending', 'accepted'] },
//     }).populate('userId', 'name location phone');

//     // Filter response to hide phone unless status is accepted
//     const filteredRequests = requests.map((req) => {
//       const user = {
//         name: req.userId?.name,
//         location: req.userId?.location,
//       };

//       // Include phone only if request is accepted
//       if (req.status === 'accepted') {
//         user.phone = req.userId?.phone;
//       }

//       return {
//         _id: req._id,
//         userId: user,
//         hireDate: req.hireDate,
//         status: req.status,
//       };
//     });

//     res.status(200).json(filteredRequests);
//   } catch (err) {
//     console.error("Error fetching requests:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


