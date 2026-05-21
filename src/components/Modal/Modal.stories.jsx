import { useState } from 'react'
import { Button } from '../Button/Button'
import { Space } from '../Space/Space'
import { Modal } from './Modal'

export default {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Modal presents blocking workflows with portal rendering, Escape close, mask close, and footer actions.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    width: {
      control: 'number',
    },
    closable: {
      control: 'boolean',
    },
    maskClosable: {
      control: 'boolean',
    },
    confirmLoading: {
      control: 'boolean',
    },
  },
}

export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button type="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          title="Create release"
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          Confirm this release package before installing it in Product A.
        </Modal>
      </>
    )
  },
}

export const CustomFooter = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Review changes</Button>
        <Modal
          open={open}
          title="Review component changes"
          footer={
            <Space>
              <Button variant="ghost" onClick={() => setOpen(false)}>Later</Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>Save draft</Button>
              <Button type="primary" onClick={() => setOpen(false)}>Publish</Button>
            </Space>
          }
          onCancel={() => setOpen(false)}
        >
          Use a custom footer when the workflow needs more than confirm and cancel.
        </Modal>
      </>
    )
  },
}
